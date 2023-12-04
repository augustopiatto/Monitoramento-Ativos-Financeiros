import React from "react";
import Input from "../html_components/Input";
import MoneyInput from "../input_components/MoneyInput";
import Select from "../html_components/Select";
import Button from "../html_components/Button";
import Spacer from "../ui_components/Spacer";
import api from "../../api/api";
import { FunnelsContext } from "../../contexts/FunnelsContext";
import { getErrorMessage } from "../../helpers/helpers";
import { AxiosError } from "axios";
// import { assetsMock, funnelsMock, newAssetMock } from "../../apimock/apimock";

function AssetsInputs() {
  const [peridiocity, setPeridiocity] = React.useState<number | "">("");
  const [maxValue, setMaxValue] = React.useState<number | "">("");
  const [minValue, setMinValue] = React.useState<number | "">("");
  const [assetName, setAssetName] = React.useState<string>("");

  const {
    assetsItems,
    allAssets,
    funnels,
    setFunnels,
    setAllAssets,
    filterNotSelectedAssets,
  } = React.useContext(FunnelsContext);

  //: Mock
  // function loadFakeAssets() {
  //   setFunnels(funnelsMock);
  //   filterNotSelectedAssets(assetsMock, funnelsMock);
  // }

  async function loadAssets() {
    const funnelsParams = { user_id: 1 };
    try {
      const [responseURL, responseSelected] = await Promise.all([
        api.getAssets(),
        api.getFunnels(funnelsParams),
      ]);
      setAllAssets(responseURL);
      setFunnels(responseSelected);
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
      if (maxValue < minValue) {
        window.alert("O túnel superior tem que ser maior que o túnel inferior");
        return;
      }
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
        //: Mock
        // const newAsset = newAssetMock(params);
        const newAsset = await api.postFunnel(params);
        const newSelectedAssets = [...funnels, newAsset];
        setFunnels(newSelectedAssets);
        filterNotSelectedAssets(allAssets, newSelectedAssets);
      } catch (error) {
        const message = getErrorMessage(error);
        window.alert(`Não foi possível adicionar o ativo, ${message}`);
        return;
      }
      resetInputs();
    } else {
      window.alert("Todos campos são obrigatórios");
      return;
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
        rules={["maxLength"]}
      />
      <MoneyInput
        name={"Túnel Superior (R$)"}
        value={maxValue}
        setValue={setMaxValue}
        rules={["validNumber", "maxLength"]}
      />
      <MoneyInput
        name={"Túnel Inferior (R$)"}
        value={minValue}
        setValue={setMinValue}
        rules={["validNumber", "maxLength"]}
      />
      <Spacer />
      <Button name={"Adicionar"} onClick={handleClick} secondary />
    </div>
  );
}

export default AssetsInputs;
