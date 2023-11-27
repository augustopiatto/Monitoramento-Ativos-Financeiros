import React from "react";
import { SelectedAssetsContext } from "../contexts/SelectedAssetsContext";
import AssetsInfosList from "./AssetsInfosList";
import AssetsList from "./AssetsList";
import Button from "./html_components/Button";
import { AssetInfos } from "../interfaces/ItemInterface";
// import { assetInfosFromPostgres } from "../apimock/apimock";

function AssetsView() {
  const [assetsInfos, setAssetsInfos] = React.useState<AssetInfos[]>([]);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const { selectedAssets } = React.useContext(SelectedAssetsContext);

  // : É a chamada de mock do front
  // function loadAssetsInfos(assetNames: string[]) {
  //   return assetInfosFromPostgres.filter((asset) =>
  //     assetNames.includes(asset.name)
  //   );
  // }

  function loadAssetsInfos() {
    return selectedAssets.reduce((result, asset) => {
      if (asset.cur_value) {
        result.push({ name: asset.name, cur_value: asset.cur_value });
      }
      return result;
    }, [] as AssetInfos[]);
  }

  function handleClick() {
    // : É a chamada de mock do front
    // const assetsNames = selectedAssets.map((asset) => asset.name);
    // const filteredAssetsInfos = loadFakeAssetsInfos(assetsNames);

    // Vou fazer chamada de API aqui para trazer todos os ativos que tiverem valor
    // Se eu usasse algum método de atualizar a tela, iria ficar batendo na API externa
    // o tempo todo, o que pode ser custoso
    const filteredAssetsInfos = loadAssetsInfos();
    setAssetsInfos(filteredAssetsInfos);
    setOpenDialog(true);
  }

  return (
    <div className="flex flex-col items-center gap-5 w-[400px] bg-lb2 p-5 shadow-md shadow-g1">
      <h2 className="text-2xl font-semibold">Ativos selecionados</h2>
      <AssetsList />
      <Button name={"Consultar"} onClick={handleClick} />
      <AssetsInfosList
        assetsInfos={assetsInfos}
        opened={openDialog}
        setOpened={setOpenDialog}
      />
    </div>
  );
}

export default AssetsView;
