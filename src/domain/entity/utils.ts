interface Success<TData> {
  success: true
  data: TData
}

interface Error {
  success: false
  details?: unknown
}

export type APIResponse<TData> = Success<TData> | Error
