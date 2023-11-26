import React, { ReactNode } from "react";
import {
  AssetInterface,
  ExternalAssetInterface,
  SelectedAssetInterface,
} from "../interfaces/ItemInterface";

type SelectedAssetsContextType = {
  assetsItems: AssetInterface[];
  selectedAssets: SelectedAssetInterface[];
  responseExternal: ExternalAssetInterface[];
  setAssetsItems: (assets: AssetInterface[]) => void;
  setSelectedAssets: (assets: SelectedAssetInterface[]) => void;
  setResponseExternal: (assets: ExternalAssetInterface[]) => void;
  filterNotSelectedAssets: (
    externalAssets: ExternalAssetInterface[],
    selectedAssets: SelectedAssetInterface[]
  ) => void;
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
  const [responseExternal, setResponseExternal] = React.useState<
    ExternalAssetInterface[]
  >([]);
  const [assetsItems, setAssetsItems] = React.useState<AssetInterface[]>([]);

  function filterNotSelectedAssets(
    responseExternal: ExternalAssetInterface[],
    selectedAssets: SelectedAssetInterface[]
  ) {
    const selectedAssetsNames = selectedAssets.map((asset) => asset.name);
    const filteredAssets = responseExternal.filter(
      (asset) => !selectedAssetsNames.includes(asset.name)
    );
    setAssetsItems(filteredAssets);
  }

  return (
    <SelectedAssetsContext.Provider
      value={{
        assetsItems,
        selectedAssets,
        responseExternal,
        setAssetsItems,
        setSelectedAssets,
        setResponseExternal,
        filterNotSelectedAssets,
      }}
    >
      {children}
    </SelectedAssetsContext.Provider>
  );
};
