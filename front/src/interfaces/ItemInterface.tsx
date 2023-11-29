export interface AssetInterface {
  id: number;
  name: string;
  cur_value: number;
}

export interface FunnelInterface {
  id: number;
  name: string;
  periodicity: number | "";
  max_value: number | "";
  min_value: number | "";
}
