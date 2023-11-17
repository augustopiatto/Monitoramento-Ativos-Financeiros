import {
  AssetInterface,
  SelectedAssetInterface,
} from "../interfaces/ItemInterface";

export const assetsFromURL: AssetInterface[] = [
  { id: 1, name: "Petro" },
  { id: 2, name: "Enel" },
  { id: 3, name: "MWL" },
  { id: 4, name: "B2W" },
  { id: 5, name: "MWL" },
  { id: 6, name: "AAA" },
  { id: 7, name: "BBB" },
  { id: 8, name: "CCC" },
  { id: 9, name: "DDD" },
  { id: 10, name: "EEE" },
];

export const selectedAssets: SelectedAssetInterface[] = [
  { id: 1, name: "Petro", periodicity: 120, max_value: 200, min_value: 100 },
  { id: 2, name: "Enel", periodicity: 170, max_value: 220, min_value: 80 },
  { id: 3, name: "MWL", periodicity: 60, max_value: 50, min_value: 10 },
  { id: 4, name: "B2W", periodicity: 400, max_value: 2000, min_value: 500 },
  { id: 5, name: "MWL", periodicity: 2000, max_value: 145, min_value: 140 },
];
