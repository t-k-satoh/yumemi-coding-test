import { AxiosError } from 'axios'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export type Error = AxiosError<{
  timestamp: string
  status: StatusCodes
  error: ReasonPhrases
  message: string
  details?: Record<string, unknown> | string
}>
