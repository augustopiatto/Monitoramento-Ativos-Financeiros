import React from "react";
import Input from "./html_components/Input";
import MoneyInput from "./input_components/MoneyInput";
import Select from "./html_components/Select";
import {
  AssetInterface,
  SelectedAssetInterface,
} from "../interfaces/ItemInterface";
import Button from "./html_components/Button";
import Spacer from "./ui_components/Spacer";
import { assetsFromURL } from "../apimock/apimock";
import api from "../api/api";
import { SelectedAssetsContext } from "../contexts/SelectedAssetsContext";

function AssetsInputs() {
  const [peridiocity, setPeridiocity] = React.useState<number | "">("");
  const [maxValue, setMaxValue] = React.useState<number | "">("");
  const [minValue, setMinValue] = React.useState<number | "">("");
  const [assetsItems, setAssetsItems] = React.useState<AssetInterface[]>([]);
  const [assetName, setAssetName] = React.useState<string>("");

  const { selectedAssets, setSelectedAssets } = React.useContext(
    SelectedAssetsContext
  );

  function filterNotSelectedAssets(
    allAssets: AssetInterface[],
    selectedAssets: SelectedAssetInterface[]
  ) {
    const selectedAssetsNames = selectedAssets.map((asset) => asset.name);
    const filteredAssets = allAssets.filter(
      (asset) => !selectedAssetsNames.includes(asset.name)
    );
    setAssetsItems(filteredAssets);
  }

  // function loadFakeAssets() {
  //   setSelectedAssets(selectedAssetsFromPostgres);
  //   filterNotSelectedAssets(assetsFromURL, selectedAssetsFromPostgres);
  // }

  async function loadAssets() {
    // Deixar chamada em paralelo
    // const responseURL = await fetch("URL do site");
    // const jsonURL = await responseURL.json();
    const responseSelected = await api.getSelectedAssets();
    console.log("api", responseSelected);
    // setSelectedAssets(jsonSelected);
    // const filteredAssets = filterNotSelectedAssets(jsonURL, jsonSelected)
    // setAssetsItems(filteredAssets);
  }

  function resetInputs() {
    setAssetName("");
    setPeridiocity("");
    setMaxValue("");
    setMinValue("");
  }

  function handleClick() {
    const newAsset = {
      name: assetName,
      periodicity: peridiocity,
      max_value: maxValue,
      min_value: minValue,
    };
    const newSelectedAssets = [...selectedAssets, newAsset];
    setSelectedAssets(newSelectedAssets);
    filterNotSelectedAssets(assetsFromURL, newSelectedAssets);
    resetInputs();
  }

  React.useEffect(() => {
    loadAssets();
    // loadFakeAssets();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-3 items-center justify-center">
      <Select
        name={"Ativos"}
        placeholder={"Escolha o ativo"}
        setValue={setAssetName}
        items={assetsItems}
      />
      <Input
        name={"Peridiocidade"}
        placeholder={"minutos"}
        value={peridiocity}
        setValue={setPeridiocity}
      />
      <MoneyInput
        name={"Túnel Superior (R$)"}
        value={maxValue}
        setValue={setMaxValue}
      />
      <MoneyInput
        name={"Túnel Inferior (R$)"}
        value={minValue}
        setValue={setMinValue}
      />
      <Spacer />
      <Button name={"Adicionar"} onClick={handleClick} secondary />
    </div>
  );
}

export default AssetsInputs;
