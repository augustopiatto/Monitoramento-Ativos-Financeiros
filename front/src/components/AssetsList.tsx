import React from "react";
import { SelectedAssetsContext } from "../contexts/SelectedAssetsContext";
import Tag from "./ui_components/Tag";

function AssetsList() {
  const { selectedAssets } = React.useContext(SelectedAssetsContext);

  return (
    <div className="w-10/12 h-assetslist rounded-md p-2 flex flex-wrap justify-center content-start gap-3 overflow-y-auto">
      {selectedAssets &&
        !!selectedAssets.length &&
        selectedAssets.map((asset) => <Tag asset={asset} key={asset.name} />)}
    </div>
  );
}

export default AssetsList;
