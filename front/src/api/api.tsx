import axios from "axios";

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
  getSelectedAssets(params?: { id?: number; name?: string }) {
    return get("assets/", params).then((response) => response.data);
  },
  postSelectedAsset(params: {
    name: string;
    periodicity: number;
    max_value: number;
    min_value: number;
  }) {
    console.log(params);
    return post("assets/", params).then((response) => response.data);
  },
  getExternalAssets(params?: { asset?: string }) {
    return get("external_assets/list", params).then(
      (response) => response.data
    );
  },
};

export default api;
