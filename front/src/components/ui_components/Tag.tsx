import React from "react";
import api from "../../api/api";
import { getErrorMessage } from "../../helpers/helpers";
import { SelectedAssetInterface } from "../../interfaces/ItemInterface";
import { SelectedAssetsContext } from "../../contexts/SelectedAssetsContext";

interface TagInterface {
  asset: SelectedAssetInterface;
}

function Tag({ asset }: TagInterface) {
  const {
    responseExternal,
    selectedAssets,
    setSelectedAssets,
    filterNotSelectedAssets,
  } = React.useContext(SelectedAssetsContext);

  async function removeAsset(asset: SelectedAssetInterface) {
    const params = { id: asset.id };
    try {
      await api.postRemoveSelectedAsset(params);
    } catch (error) {
      const message = getErrorMessage(error);
      window.alert(`Não foi possível remover o ativo, ${message}`);
    }
    const filteredAssets = selectedAssets.filter(
      (selectedAsset) => selectedAsset.name != asset.name
    );
    setSelectedAssets(filteredAssets);
    filterNotSelectedAssets(responseExternal, filteredAssets);
    // tem que fazer a remoção do banco e da store juntos, se houver falha no banco, não
    // faz da store
    // repetir o processo de cima para adição também
    // fazer alerta na tela do usuário usando window.alert pra avisar
  }

  return (
    <div className="bg-g1 w-fit rounded-lg p-3 flex items-start gap-5">
      <div className="flex-1">
        <p className="font-semibold">{asset.name}</p>
        <p className="font-semibold">{asset.periodicity} min</p>
        <p className="font-semibold">R$ {asset.max_value}</p>
        <p className="font-semibold">R$ {asset.min_value}</p>
      </div>
      <button onClick={() => removeAsset(asset)}>
        <span className="font-bold">X</span>
      </button>
    </div>
  );
}

export default Tag;
