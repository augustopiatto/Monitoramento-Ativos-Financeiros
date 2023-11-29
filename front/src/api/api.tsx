import axios from "axios";
import { AssetInterface, FunnelInterface } from "../interfaces/ItemInterface";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

const get = (url: string, params: unknown) => {
  return axiosInstance.get(url, { params });
};

const post = (url: string, params: unknown) => {
  return axiosInstance.post(url, { params });
};

const api = {
  getAssets(params?: { ids?: number[] }): Promise<AssetInterface[]> {
    return get("assets/", params).then((response) => response.data);
  },
  getFunnels(params?: {
    id?: number;
    name?: string;
  }): Promise<FunnelInterface[]> {
    return get("funnels/", params).then((response) => response.data);
  },
  postFunnel(params: {
    name: string;
    periodicity: number;
    max_value: number;
    min_value: number;
  }): Promise<FunnelInterface> {
    return post("funnels/", params).then((response) => response.data);
  },
  postRemoveFunnel(params: { id: number }): Promise<void> {
    return post("funnels/remove/", params).then((response) => response.data);
  },
};

export default api;
