export interface AssetInterface {
  name: string;
}

export interface SelectedAssetInterface {
  id: number;
  name: string;
  periodicity: number | "";
  max_value: number | "";
  min_value: number | "";
}

export interface ExternalAssetInterface {
  name: string;
}

export interface AssetInfos {
  name: string;
  cur_value: number;
}
