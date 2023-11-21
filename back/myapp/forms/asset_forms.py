from pydantic import BaseModel
from typing import Optional


class AssetForm(BaseModel):
    id: Optional[int]
    name: Optional[str]
