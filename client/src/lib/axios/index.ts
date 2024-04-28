import { PATH_LIST } from "@/constants/enum";
import baseAxios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

let token = "";

const axios = baseAxios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export const setAccessToken = async (newToken?: string) => {
  try {
    if (newToken) {
      token = "Bearer " + newToken;
      return;
    }
    token = await axios
      .get(PATH_LIST.REFRESH)
      .then((res: any) => res.data.accessToken);

    return token;

  } catch (error) {
    return null;
  }
};

const refreshAuth = async (failedRequest: any) => {
  const newToken = await setAccessToken();
  if (newToken) {
    token = "Bearer " + newToken;
    return Promise.resolve(newToken);
  } else {
    return Promise.reject(failedRequest);
  }
};

createAuthRefreshInterceptor(axios, refreshAuth, {
  statusCodes: [428],
  pauseInstanceWhileRefreshing: true,
});

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = token;
    return config;
  }, (error) => Promise.reject(error)
)

export default axios;