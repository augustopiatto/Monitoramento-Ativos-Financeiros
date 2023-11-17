import React from "react";
import { SelectedAssetInterface } from "../interfaces/ItemInterface";
import { SelectedAssetsContext } from "../contexts/SelectedAssetsContext";

interface TagInterface {
  asset: SelectedAssetInterface;
}

function Tag({ asset }: TagInterface) {
  const { removeAsset } = React.useContext(SelectedAssetsContext);

  return (
    <div className="bg-g1 w-fit rounded-lg p-3 flex items-start gap-5">
      <div className="flex-1">
        <p className="font-semibold">{asset.name}</p>
        <p className="font-semibold">{asset.periodicity} min</p>
        <p className="font-semibold">R$ {asset.max_value}</p>
        <p className="font-semibold">R$ {asset.min_value}</p>
      </div>
      <button onClick={() => removeAsset(asset)}>
        <span className="font-bold">X</span>
      </button>
    </div>
  );
}

export default Tag;
