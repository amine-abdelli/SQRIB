import { AxiosError } from "axios";

export function formatErrorMessage(error: any) {
  const axiosError = error as AxiosError as any;
  return axiosError.response?.data?.error?.message ?? axiosError.message;
}