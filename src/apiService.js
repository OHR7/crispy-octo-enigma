import axios from "axios";

export const API_BACKEND = "http://localhost:8000/";

axios.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) return Promise.reject();

    const token = JSON.parse(tokenString);

    config.headers["Authorization"] = `Token ${token.token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.defaults.headers.common["Content-Type"] = "application/json";

export { axios };
