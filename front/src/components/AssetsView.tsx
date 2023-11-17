import React from "react";
import { SelectedAssetsContext } from "../contexts/SelectedAssetsContext";
import AssetsInfosList from "./AssetsInfosList";
import AssetsList from "./AssetsList";
import Button from "./html_components/Button";
import { assetInfosFromPostgres } from "../apimock/endpoints";
import { AssetInfos } from "../interfaces/ItemInterface";

function AssetsView() {
  const [assetsInfos, setAssetsInfos] = React.useState<AssetInfos[]>([]);
  const { selectedAssets } = React.useContext(SelectedAssetsContext);

  function loadFakeAssetsInfos(assetNames: string[]) {
    return assetInfosFromPostgres.filter((asset) =>
      assetNames.includes(asset.name)
    );
  }

  // function loadAssetsInfos(assetNames) {}

  function handleClick() {
    // loadFakeAssetsInfos()
    // loadAssetsInfos()
    const assetsNames = selectedAssets.map((asset) => asset.name);
    const filteredAssetsInfos = loadFakeAssetsInfos(assetsNames);
    setAssetsInfos(filteredAssetsInfos);
  }

  return (
    <div className="flex flex-col items-center gap-5 w-[400px] bg-lb2 p-5 shadow-md shadow-g1">
      <h2 className="text-2xl font-semibold">Ativos selecionados</h2>
      <AssetsList />
      <Button name={"Consultar"} onClick={handleClick} />
      <AssetsInfosList assetsInfos={assetsInfos} />
    </div>
  );
}

export default AssetsView;
