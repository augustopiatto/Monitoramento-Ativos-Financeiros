import React from "react";
import TextInput from "./html_components/Input";
import MoneyInput from "./input_components/MoneyInput";
import Select from "./html_components/Select";
import AssetInterface from "../interfaces/ItemInterface";
import Button from "./html_components/Button";
import Spacer from "./Spacer";
import assets from "../apimock/endpoints";

function AssetsInputs() {
  const [peridiocity, setPeridiocity] = React.useState<number>(0);
  const [maxValue, setMaxValue] = React.useState<number>(0);
  const [minValue, setMinValue] = React.useState<number>(0);
  const [assetsItems, setAssetsItems] = React.useState<AssetInterface[]>([]);
  const [asset, setAsset] = React.useState<number | null>(null);

  function loadFakeAssets() {
    setAssetsItems(assets);
  }

  function handleClick() {
    console.log("clicou");
  }

  React.useEffect(() => {
    // loadAssets()
    loadFakeAssets();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-3 items-center justify-center">
      <Select
        name={"Ativos"}
        placeholder={"Escolha o ativo"}
        setValue={setAsset}
        items={assetsItems}
      />
      <TextInput
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
      <Button name={"Adicionar"} onClick={handleClick} />
    </div>
  );
}

export default AssetsInputs;
