import auth from "@/utils/auth";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

interface ErrorResponse {
  message?: string;
  [key: string]: any;
}

const { NEXT_APP_BASE_URL_LOCAL_HOST } = process.env;

const clientAxios = axios.create({
  baseURL: NEXT_APP_BASE_URL_LOCAL_HOST || "https://devapi.propsoft.ai",
});

// Request Interceptor
clientAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = auth.getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

clientAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response?.status;
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.status_message ||
        "An unexpected error occurred.";

      if (status === 401) {
        // Handle unauthorized error
        auth.clearToken();
        return Promise.reject({
          message: "Unauthorized. Please log in again.",
          status,
        });
      }

      if (status === 500) {
        // Handle server errors
        return Promise.reject({
          message: "Internal server error. Please try again later.",
          status,
        });
      }

      // Handle other custom server errors
      return Promise.reject({
        message: errorMessage,
        status,
      });
    }

    // If the error is not an AxiosError or doesn't have a response
    return Promise.reject({
      message: "An unexpected error occurred.",
      status: 0,
    });
  }
);

export default clientAxios;
