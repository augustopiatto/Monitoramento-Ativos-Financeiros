export interface AssetInterface {
  id: number;
  name: string;
  periodicity?: number;
  max_value?: number;
  min_value?: number;
}

export interface SelectedAssetInterface {
  id: number;
  name: string;
  periodicity: number;
  max_value: number;
  min_value: number;
}
