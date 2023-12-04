import { AssetInterface, FunnelInterface } from "../interfaces/ItemInterface";

export const assetsMock: AssetInterface[] = [
  { id: 1, name: "Petro", cur_value: 150 },
  { id: 2, name: "Enel", cur_value: 120 },
  { id: 3, name: "MWL", cur_value: 30 },
  { id: 4, name: "B2W", cur_value: 1800 },
  { id: 5, name: "Buser", cur_value: 1 },
  { id: 6, name: "AAA", cur_value: 2 },
  { id: 7, name: "BBB", cur_value: 3 },
  { id: 8, name: "CCC", cur_value: 4 },
  { id: 9, name: "DDD", cur_value: 5 },
  { id: 10, name: "EEE", cur_value: 6 },
];

export const funnelsMock: FunnelInterface[] = [
  { id: 1, name: "Petro", periodicity: 120, max_value: 200, min_value: 100 },
  { id: 2, name: "Enel", periodicity: 170, max_value: 220, min_value: 80 },
  { id: 3, name: "MWL", periodicity: 60, max_value: 50, min_value: 10 },
  { id: 4, name: "B2W", periodicity: 400, max_value: 2000, min_value: 500 },
  { id: 5, name: "Buser", periodicity: 2000, max_value: 145, min_value: 140 },
];

export const assetsFromTunnelsMock: AssetInterface[] = [
  { id: 1, name: "Petro", cur_value: 150 },
  { id: 2, name: "Enel", cur_value: 120 },
  { id: 3, name: "MWL", cur_value: 30 },
  { id: 4, name: "B2W", cur_value: 1800 },
];

interface newAssetMock {
  name: string;
  periodicity: number;
  max_value: number;
  min_value: number;
  user_id: number;
}

export function newAssetMock(params: newAssetMock): FunnelInterface {
  return {
    id: params.periodicity + 1,
    name: params.name,
    periodicity: params.periodicity,
    max_value: params.max_value,
    min_value: params.min_value,
  };
}
