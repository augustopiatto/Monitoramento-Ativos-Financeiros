import React, { ReactNode } from "react";
import { SelectedAssetInterface } from "../interfaces/ItemInterface";

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

  function removeAsset(asset: SelectedAssetInterface) {
    const filteredAssets = selectedAssets.filter(
      (selectedAsset) => selectedAsset.name != asset.name
    );
    setSelectedAssets(filteredAssets);
  }

  return (
    <SelectedAssetsContext.Provider
      value={{ selectedAssets, setSelectedAssets, removeAsset }}
    >
      {children}
    </SelectedAssetsContext.Provider>
  );
};
