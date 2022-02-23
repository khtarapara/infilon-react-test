import axios from "axios";

const axiosConfig = {
  baseURL: "https://reqres.in/api",
  timeout: 12000,
};

const axiosInstance = axios.create(axiosConfig);

export { axiosInstance };
