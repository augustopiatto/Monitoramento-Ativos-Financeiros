import React from "react";
import { SelectedAssetsContext } from "../contexts/SelectedAssetsContext";
import AssetsPricesList from "./AssetsPricesList";
import AssetsList from "./AssetsList";
import Button from "./html_components/Button";
import { AssetInfos } from "../interfaces/ItemInterface";
import api from "../api/api";
// import { assetInfosFromPostgres } from "../apimock/apimock";

function AssetsView() {
  const [assetsPrices, setAssetsPrices] = React.useState<AssetInfos[]>([]);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const { selectedAssets } = React.useContext(SelectedAssetsContext);

  // : É a chamada de mock do front
  // function loadFakeAssetsInfos(assetNames: string[]) {
  //   return assetInfosFromPostgres.filter((asset) =>
  //     assetNames.includes(asset.name)
  //   );
  // }

  async function handleClick() {
    // : É a chamada de mock do front
    // const assetsNames = selectedAssets.map((asset) => asset.name);
    // const filteredAssetsInfos = loadFakeAssetsInfos(assetsNames);

    // Vou fazer chamada de API aqui para trazer todos os ativos que tiverem valor
    // Se eu usasse algum método de atualizar a tela, iria ficar batendo na API externa
    // o tempo todo, o que pode ser custoso
    const selectedAssetsIds = selectedAssets.map((asset) => asset.id);
    const params = {
      ids: selectedAssetsIds,
    };
    const filteredAssetsInfos = await api.getAssetsPrice(params);
    setAssetsPrices(filteredAssetsInfos);
    setOpenDialog(true);
  }

  return (
    <div className="flex flex-col items-center gap-5 w-[400px] bg-lb2 p-5 shadow-md shadow-g1">
      <h2 className="text-2xl font-semibold">Ativos selecionados</h2>
      <AssetsList />
      <Button name={"Consultar"} onClick={handleClick} />
      <AssetsPricesList
        assetsPrices={assetsPrices}
        opened={openDialog}
        setOpened={setOpenDialog}
      />
    </div>
  );
}

export default AssetsView;
