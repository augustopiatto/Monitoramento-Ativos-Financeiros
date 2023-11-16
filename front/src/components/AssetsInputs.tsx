import React from "react";
import TextInput from "./htHTML_Components/Input";
import MoneyInput from "./input_components/MoneyInput";
import Select from "./htHTML_Components/Select";
import AssetInterface from "../interfaces/ItemInterface";
import Button from "./htHTML_Components/Button";

function AssetsInputs() {
  const [peridiocity, setPeridiocity] = React.useState<number>(0);
  const [maxValue, setMaxValue] = React.useState<number>(0);
  const [minValue, setMinValue] = React.useState<number>(0);
  const [assetsItems, setAssetsItems] = React.useState<AssetInterface[]>([
    { id: 1, name: "Petro" },
    { id: 2, name: "MWL" },
  ]);
  const [asset, setAsset] = React.useState<number | null>(null);

  return (
    <div className="p-5 flex-1 bg-slate-300">
      <h1 className="text-3xl font-bold my-3">Inoa Sistemas</h1>
      <div className="flex flex-col gap-3 items-center justify-center">
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
        <Button name={"Adicionar"} />
      </div>
    </div>
  );
}

export default AssetsInputs;
