from fastapi import APIRouter, HTTPException
from app.models.schemas import InsuranceInput, PredictionResponse
from app.services.ml_service import run_prediction

router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
async def predict_insurance(payload: InsuranceInput):
    """Run the ML pipeline and return a rich prediction response."""
    try:
        result = run_prediction(payload.model_dump())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
