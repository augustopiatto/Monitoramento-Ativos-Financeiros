import React from "react";
import Input from "./html_components/Input";
import MoneyInput from "./input_components/MoneyInput";
import Select from "./html_components/Select";
import Button from "./html_components/Button";
import Spacer from "./ui_components/Spacer";
import api from "../api/api";
import { SelectedAssetsContext } from "../contexts/SelectedAssetsContext";
import { getErrorMessage } from "../helpers/helpers";
import { AxiosError } from "axios";
// import { assetsFromURL } from "../apimock/apimock";

function AssetsInputs() {
  const [peridiocity, setPeridiocity] = React.useState<number | "">("");
  const [maxValue, setMaxValue] = React.useState<number | "">("");
  const [minValue, setMinValue] = React.useState<number | "">("");
  const [assetName, setAssetName] = React.useState<string>("");

  const {
    assetsItems,
    responseExternal,
    selectedAssets,
    setSelectedAssets,
    setResponseExternal,
    filterNotSelectedAssets,
  } = React.useContext(SelectedAssetsContext);

  // function loadFakeAssets() {
  //   setSelectedAssets(selectedAssetsFromPostgres);
  //   filterNotSelectedAssets(assetsFromURL, selectedAssetsFromPostgres);
  // }

  async function loadAssets() {
    try {
      const [responseURL, responseSelected] = await Promise.all([
        api.getAssets(),
        api.getSelectedAssets(),
      ]);
      setResponseExternal(responseURL);
      setSelectedAssets(responseSelected);
      filterNotSelectedAssets(responseURL, responseSelected);
    } catch (error) {
      const message = getErrorMessage(error);
      let failedURL = "";
      if (error instanceof AxiosError) failedURL = error.request.responseURL;
      let failedEndpoint = "";
      if (failedURL.includes("api/assets/"))
        failedEndpoint = "trazer os ativos selecionados";
      else failedEndpoint = "trazer todos os ativos existentes";
      window.alert(
        `Houve um problema com o endpoint de ${failedEndpoint}. Erro ${message}`
      );
      return;
    }
  }

  function resetInputs() {
    setAssetName("");
    setPeridiocity("");
    setMaxValue("");
    setMinValue("");
  }

  async function handleClick() {
    if (assetName && peridiocity && maxValue && minValue) {
      const params = {
        name: assetName,
        periodicity: peridiocity,
        max_value: maxValue,
        min_value: minValue,
        // user_id fixo para este teste, mas se fosse em produção, faria uma requisição única e salvaria em cookie
        // com cache, e consultaria a partir do cookie para salvar em um context sempre que o usuário acessasse a página
        user_id: 1,
      };
      try {
        const newAsset = await api.postSelectedAsset(params);
        const newSelectedAssets = [...selectedAssets, newAsset];
        setSelectedAssets(newSelectedAssets);
        filterNotSelectedAssets(responseExternal, newSelectedAssets);
      } catch (error) {
        const message = getErrorMessage(error);
        window.alert(`Não foi possível adicionar o ativo, ${message}`);
        return;
      }
      resetInputs();
    }
  }

  React.useEffect(() => {
    loadAssets();
    //: É a chamada de mock do front
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
