from pydantic import BaseModel, Field
from typing import Optional, List


class AssetForm(BaseModel):
    ids: Optional[List[int]] = Field(default=None, alias="ids[]")
