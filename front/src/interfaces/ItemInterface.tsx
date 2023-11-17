export interface AssetInterface {
  name: string;
}

export interface SelectedAssetInterface {
  name: string;
  periodicity: number | "";
  max_value: number | "";
  min_value: number | "";
}

export interface AssetInfos {
  name: string;
  cur_value: number;
}
