from pydantic import BaseModel, Field
from typing import Optional


class ConsultationRequest(BaseModel):
    user_id: str = Field(default="guest_user", alias="userId")
    symptoms: str
    patient_age: Optional[int] = Field(default=None, alias="patientAge")
    patient_gender: Optional[str] = Field(default=None, alias="patientGender")

    model_config = {
        "populate_by_name": True,
        "json_schema_extra": {
            "example": {
                "user_id": "112398",
                "symptoms": "Sốt và ho",
                "patient_age": 30,
                "patient_gender": "nam",
            }
        }
    }
