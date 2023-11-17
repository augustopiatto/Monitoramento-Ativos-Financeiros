import React from "react";
import { SelectedAssetsContext } from "../contexts/SelectedAssetsContext";
import Tag from "./Tag";

function AssetsList() {
  const { selectedAssets } = React.useContext(SelectedAssetsContext);

  return (
    <div className="flex justify-center max-h-assetslist">
      <div className="flex flex-wrap justify-center gap-3 w-10/12 bg-lb1 rounded p-2 overflow-y-auto">
        {selectedAssets &&
          selectedAssets.length &&
          selectedAssets.map((asset) => (
            <Tag name={asset.name} key={asset.id} />
          ))}
      </div>
    </div>
  );
}

export default AssetsList;
