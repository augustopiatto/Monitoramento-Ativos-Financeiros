import React, { ReactNode } from "react";
import { SelectedAssetInterface } from "../interfaces/ItemInterface";

type SelectedAssetsContextType = {
  selectedAssets: SelectedAssetInterface[];
  setSelectedAssets: (assets: SelectedAssetInterface[]) => void;
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

  return (
    <SelectedAssetsContext.Provider
      value={{ selectedAssets, setSelectedAssets }}
    >
      {children}
    </SelectedAssetsContext.Provider>
  );
};
