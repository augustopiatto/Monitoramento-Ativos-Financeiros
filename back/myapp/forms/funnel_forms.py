from pydantic import BaseModel, field_validator
from typing import Optional


class GetFunnelForm(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    user_id: int


class PostFunnelForm(BaseModel):
    name: str
    periodicity: int
    max_value: float
    min_value: float
    user_id: int

    @field_validator("max_value", "min_value")
    @classmethod
    def minimum_value(cls, value):
        if value < 0.01:
            raise ValueError("Valor tem que ser maior que 0.01")
        return value


class RemoveFunnelForm(BaseModel):
    id: int
