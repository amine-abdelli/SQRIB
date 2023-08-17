export function formatErrorMessage(error: any) {
  return error.response?.data?.error?.message ?? error.message;
}