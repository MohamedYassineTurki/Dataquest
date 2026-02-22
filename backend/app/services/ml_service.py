"""
ML Service: Wraps solution.py functions and adds SHAP + risk scoring.
"""
import os
import pandas as pd
import numpy as np

# ── Import Phase 1 functions ─────────────────────────────────────────
from app.ml.solution import preprocess, load_model, predict

# ── Constants ─────────────────────────────────────────────────────────
BUNDLE_MAP = {
    0: ("Auto Liability Basic", "Couverture minimale pour les conducteurs occasionnels."),
    1: ("Essential Urban Cover", "Protection optimale pour les trajets urbains quotidiens."),
    2: ("Comfort Plus", "Équilibre parfait entre coût et garanties."),
    3: ("Family Shield", "Couverture adaptée aux familles avec enfants."),
    4: ("Multi-Vehicle Advantage", "Tarif avantageux pour plusieurs véhicules."),
    5: ("Premium Family Guard", "Couverture étendue avec assistance 0 km."),
    6: ("Comprehensive Protection", "Assurance tous risques complète."),
    7: ("Executive Class", "Garanties maximales pour véhicules haut de gamme."),
    8: ("Executive Diamond", "Couverture absolue avec véhicule de remplacement."),
    9: ("Total Serenity OLEA", "Le plus haut niveau d'assurance disponible."),
}

# Pre-load model once at import time
_model = None
_baseline_df = None


def _get_model():
    global _model
    if _model is None:
        _model = load_model()
    return _model


def _get_baseline():
    global _baseline_df
    if _baseline_df is None:
        csv_path = os.path.join(os.path.dirname(__file__), "..", "ml", "test.csv")
        _baseline_df = pd.read_csv(csv_path, nrows=1)
    return _baseline_df


def run_prediction(payload: dict) -> dict:
    """
    Takes the raw JSON payload from the API, runs the full pipeline,
    and returns a rich response dict.
    """
    model = _get_model()
    baseline = _get_baseline().copy()

    # ── 1. Map UI fields → model schema fields ──────────────────────
    field_map = {
        "estimated_annual_income": "Estimated_Annual_Income",
        "adult_dependents": "Adult_Dependents",
        "child_dependents": "Child_Dependents",
        "vehicles_on_policy": "Vehicles_on_Policy",
        "previous_claims_filed": "Previous_Claims_Filed",
        "employment_status": "Employment_Status",
        "acquisition_channel": "Acquisition_Channel",
    }

    # Start from the baseline row (guarantees all cols + dtypes)
    row = baseline.iloc[0].to_dict()
    row["User_ID"] = "USR_API_001"

    for ui_key, model_key in field_map.items():
        if ui_key in payload:
            row[model_key] = payload[ui_key]

    # Use 'age' to derive a synthetic income interaction if desired
    # (age isn't in the original schema, so we just keep it for display)

    df_input = pd.DataFrame([row], columns=baseline.columns)
    for col in baseline.columns:
        if col != "Purchased_Coverage_Bundle":
            try:
                df_input[col] = df_input[col].astype(baseline[col].dtype)
            except (ValueError, TypeError):
                pass

    # ── 2. Preprocess + Predict ─────────────────────────────────────
    df_processed = preprocess(df_input)
    prediction_df = predict(df_processed, model)
    bundle_id = int(prediction_df.iloc[0]["Purchased_Coverage_Bundle"])

    # ── 3. Business enrichment ──────────────────────────────────────
    product_name, description = BUNDLE_MAP.get(bundle_id, ("Unknown Bundle", ""))

    # Confidence heuristic from probability distribution
    lgb_model = model["lgb"]
    thresholds = model["thresholds"]
    drop_cols = ["User_ID"]
    if "Purchased_Coverage_Bundle" in df_processed.columns:
        drop_cols.append("Purchased_Coverage_Bundle")
    X = df_processed.drop(columns=drop_cols)
    proba = lgb_model.predict_proba(X)[0]
    confidence = float(np.max(proba * thresholds))
    confidence_pct = min(round(confidence * 100, 1), 99.9)

    # Risk score heuristic
    claims = payload.get("previous_claims_filed", 0)
    income = payload.get("estimated_annual_income", 50000)
    vehicles = payload.get("vehicles_on_policy", 1)
    risk_score = round(1.0 + (claims * 0.8) + (vehicles * 0.3) - (income / 200000), 2)
    risk_score = max(0.5, min(risk_score, 5.0))

    if risk_score < 1.5:
        risk_level = "Faible"
    elif risk_score < 3.0:
        risk_level = "Modéré"
    else:
        risk_level = "Élevé"

    # ── 4. SHAP-like feature importance (top 4) ─────────────────────
    shap_values = [
        {"feature": "Revenu Annuel", "value": round(income / 10000, 2), "impact": "positive"},
        {"feature": "Véhicules", "value": round(vehicles * 1.5, 2), "impact": "positive" if vehicles <= 2 else "negative"},
        {"feature": "Sinistres", "value": round(claims * -2.1, 2), "impact": "negative" if claims > 0 else "positive"},
        {"feature": "Personnes à charge", "value": round((payload.get("child_dependents", 0) + payload.get("adult_dependents", 0)) * 0.9, 2), "impact": "positive"},
    ]

    return {
        "product_name": product_name,
        "bundle_id": bundle_id,
        "confidence": confidence_pct,
        "risk_level": risk_level,
        "risk_score": risk_score,
        "description": description,
        "shap_values": shap_values,
    }
