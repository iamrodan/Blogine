import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

axios.defaults.responseType = "json";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const requestHandler = (request: InternalAxiosRequestConfig<any>) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    if (request.headers) {
      request.headers["Authorization"] = "Bearer " + jwtToken;
    }
  } catch (e) {}

  return request;
};

const responseHandler = (response: AxiosResponse<any, any>) => {
  if (response.status === 401) {
    window.location.href = "/login";
  }
  return response;
};

const errorHandler = (error: string) => {
  return Promise.reject(error);
};

API.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

API.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export { API };
