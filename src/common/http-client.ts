import * as axios from 'axios';
import { AxiosInstance, AxiosResponse }  from 'axios';
import { get } from 'lodash';

export const createApi = (baseURL: string): AxiosInstance => {
  const API: AxiosInstance = axios.default.create({ baseURL });

  // API.interceptors.request.use(
  //   (config): AxiosRequestConfig => {
  //     config.headers.Authorization = `Bearer ${getToken()}`;
  //     return config;
  //   }
  // );

  API.interceptors.response.use(
    (response: AxiosResponse) => Promise.resolve(get(response, "data")),
    async (error: any) => {
      if(error.response.status === 401) {
        console.log("Token Expired!")
      }
      if(error.response.status === 403) {
        //alert('You exceeded your quota limit')
      }
      Promise.reject(get(error, "response.data"))
    }
  );

  return API;
};
