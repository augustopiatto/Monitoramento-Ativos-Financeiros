from pydantic import BaseModel
from typing import Optional, List


class AssetForm(BaseModel):
    ids: Optional[List[int]] = None
