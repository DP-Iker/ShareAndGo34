import axios from "axios";
import { getCookiesLogin } from "./cookisLogin";
import { API_URL } from "./enum/constantes";


export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token: string | null = getCookiesLogin();
  if (token !== null) {
    console.log(config.headers.Authorization);
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;
    console.log(config.headers.Authorization);
  } else {
    delete config.headers.Authorization;
  }

  return config;
});
