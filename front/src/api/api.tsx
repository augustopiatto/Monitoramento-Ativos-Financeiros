import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
});

const get = (url: string, params: unknown) => {
  return axiosInstance.get(url, { params });
};

// const post = (url, params) => {
//   return axiosInstance.post(url, { params });
// };

const api = {
  getSelectedAssets(params?: { id?: number; name?: string }) {
    return get("assets/", params).then((response) => response.data);
  },
};

export default api;
