import React from "react";
import TextInput from "./htHTML_Components/Input";
import MoneyInput from "./input_components/MoneyInput";
import Select from "./htHTML_Components/Select";
import AssetInterface from "../interfaces/ItemInterface";

function AssetsInputs() {
  const [peridiocity, setPeridiocity] = React.useState<number>(0);
  const [maxValue, setMaxValue] = React.useState<number>(0);
  const [minValue, setMinValue] = React.useState<number>(0);
  const [assetsItems, setAssetsItems] = React.useState<AssetInterface[]>([]);
  const [asset, setAsset] = React.useState<AssetInterface | null>(null);

  return (
    <div className="p-5 flex-1 bg-slate-300">
      <h1>Inoa Sistemas</h1>
      <Select
        name={"Ativos"}
        placeholder={"Escolha o ativo"}
        value={asset}
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
    </div>
  );
}

export default AssetsInputs;
