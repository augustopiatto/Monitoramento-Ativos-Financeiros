import React, { ReactNode } from "react";
import { SelectedAssetInterface } from "../interfaces/ItemInterface";
import api from "../api/api";
import { getErrorMessage } from "../helpers/helpers";

type SelectedAssetsContextType = {
  selectedAssets: SelectedAssetInterface[];
  setSelectedAssets: (assets: SelectedAssetInterface[]) => void;
  removeAsset: (asset: SelectedAssetInterface) => void;
};

export const SelectedAssetsContext =
  React.createContext<SelectedAssetsContextType>(
    {} as SelectedAssetsContextType
  );

export const SelectedAssetsStorage = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedAssets, setSelectedAssets] = React.useState<
    SelectedAssetInterface[]
  >([]);

  async function removeAsset(asset: SelectedAssetInterface) {
    const params = { id: asset.id };
    try {
      await api.postRemoveSelectedAsset(params);
      const filteredAssets = selectedAssets.filter(
        (selectedAsset) => selectedAsset.name != asset.name
      );
      setSelectedAssets(filteredAssets);
    } catch (error) {
      const message = getErrorMessage(error);
      window.alert(`Não foi possível remover o ativo, ${message}`);
    }
    // tem que fazer a remoção do banco e da store juntos, se houver falha no banco, não
    // faz da store
    // repetir o processo de cima para adição também
    // fazer alerta na tela do usuário usando window.alert pra avisar
  }

  return (
    <SelectedAssetsContext.Provider
      value={{ selectedAssets, setSelectedAssets, removeAsset }}
    >
      {children}
    </SelectedAssetsContext.Provider>
  );
};
