// types/axios.d.ts
import "axios";
declare module "axios" {
  interface AxiosRequestConfig { backgroundLoading?: boolean }
  interface InternalAxiosRequestConfig { backgroundLoading?: boolean }
}
