import React, { ReactNode } from "react";
import { AssetInterface, FunnelInterface } from "../interfaces/ItemInterface";

type SelectedAssetsContextType = {
  assetsItems: AssetInterface[];
  selectedAssets: FunnelInterface[];
  responseExternal: AssetInterface[];
  setAssetsItems: (assets: AssetInterface[]) => void;
  setSelectedAssets: (assets: FunnelInterface[]) => void;
  setResponseExternal: (assets: AssetInterface[]) => void;
  filterNotSelectedAssets: (
    externalAssets: AssetInterface[],
    selectedAssets: FunnelInterface[]
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
  const [selectedAssets, setSelectedAssets] = React.useState<FunnelInterface[]>(
    []
  );
  const [responseExternal, setResponseExternal] = React.useState<
    AssetInterface[]
  >([]);
  const [assetsItems, setAssetsItems] = React.useState<AssetInterface[]>([]);

  function filterNotSelectedAssets(
    responseExternal: AssetInterface[],
    selectedAssets: FunnelInterface[]
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
