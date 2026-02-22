from pydantic import BaseModel, Field
from typing import Optional


class InsuranceInput(BaseModel):
    """Schema matching the frontend form fields."""
    age: int = Field(default=35, description="Age of the client")
    estimated_annual_income: float = Field(default=50000, description="Annual income in local currency")
    adult_dependents: int = Field(default=1, description="Number of adult dependents")
    child_dependents: int = Field(default=0, description="Number of child dependents")
    vehicles_on_policy: int = Field(default=1, description="Vehicles on policy")
    previous_claims_filed: int = Field(default=0, description="Previous claims filed")
    employment_status: str = Field(default="Employed_FullTime", description="Employment status")
    acquisition_channel: str = Field(default="Direct_Website", description="Acquisition channel")


class SHAPFeature(BaseModel):
    feature: str
    value: float
    impact: str  # "positive" or "negative"


class PredictionResponse(BaseModel):
    product_name: str
    bundle_id: int
    confidence: float
    risk_level: str
    risk_score: float
    description: str
    shap_values: list[SHAPFeature]
