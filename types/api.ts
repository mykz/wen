export type ApiResponse<T> = Promise<{
  data?: T | null
  error?: string | null
}>
