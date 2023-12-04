from pydantic import BaseModel, field_validator, model_validator
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
    
    @field_validator("max_value", "min_value")
    @classmethod
    def max_number_length(cls, value):
        if len(str(value)) > 8:
            raise ValueError("Número maior que o permitido, máximo de 8 dígitos")
        return value

    @model_validator(mode="after")
    def max_greater_than_min(self):
        if self.max_value < self.min_value:
            raise ValueError("Túnel superior tem que ser maior que túnel inferior")
        return self


class RemoveFunnelForm(BaseModel):
    id: int
