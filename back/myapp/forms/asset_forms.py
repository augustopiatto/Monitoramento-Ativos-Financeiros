from pydantic import BaseModel


class AssetForm(BaseModel):
    name: str
