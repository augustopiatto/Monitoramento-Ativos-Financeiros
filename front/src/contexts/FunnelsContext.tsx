import React, { ReactNode } from "react";
import { AssetInterface, FunnelInterface } from "../interfaces/ItemInterface";

type FunnelsContextType = {
  assetsItems: AssetInterface[];
  funnels: FunnelInterface[];
  allAssets: AssetInterface[];
  setAssetsItems: (assets: AssetInterface[]) => void;
  setFunnels: (assets: FunnelInterface[]) => void;
  setAllAssets: (assets: AssetInterface[]) => void;
  filterNotSelectedAssets: (
    externalAssets: AssetInterface[],
    funnels: FunnelInterface[]
  ) => void;
};

export const FunnelsContext = React.createContext<FunnelsContextType>(
  {} as FunnelsContextType
);

export const FunnelsContextStorage = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [funnels, setFunnels] = React.useState<FunnelInterface[]>([]);
  const [allAssets, setAllAssets] = React.useState<AssetInterface[]>([]);
  const [assetsItems, setAssetsItems] = React.useState<AssetInterface[]>([]);

  function filterNotSelectedAssets(
    allAssets: AssetInterface[],
    funnels: FunnelInterface[]
  ) {
    const funnelNames = funnels.map((asset) => asset.name);
    const filteredAssets = allAssets.filter(
      (asset) => !funnelNames.includes(asset.name)
    );
    setAssetsItems(filteredAssets);
  }

  return (
    <FunnelsContext.Provider
      value={{
        assetsItems,
        funnels,
        allAssets,
        setAssetsItems,
        setFunnels,
        setAllAssets,
        filterNotSelectedAssets,
      }}
    >
      {children}
    </FunnelsContext.Provider>
  );
};
