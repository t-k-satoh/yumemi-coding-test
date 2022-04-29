import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export interface Error {
  timestamp: string
  status: StatusCodes
  error: ReasonPhrases
  message: string
  details?: Record<string, unknown> | string
}

export const methodNotAllowed: Error = {
  timestamp: new Date().toISOString(),
  status: StatusCodes.METHOD_NOT_ALLOWED,
  error: ReasonPhrases.METHOD_NOT_ALLOWED,
  message: ReasonPhrases.METHOD_NOT_ALLOWED,
}

export const badRequest: Error = {
  timestamp: new Date().toISOString(),
  status: StatusCodes.BAD_REQUEST,
  error: ReasonPhrases.BAD_REQUEST,
  message: ReasonPhrases.BAD_REQUEST,
}

export const forbidden: Error = {
  timestamp: new Date().toISOString(),
  status: StatusCodes.FORBIDDEN,
  error: ReasonPhrases.FORBIDDEN,
  message: ReasonPhrases.FORBIDDEN,
}

export const notFound: Error = {
  timestamp: new Date().toISOString(),
  status: StatusCodes.NOT_FOUND,
  error: ReasonPhrases.NOT_FOUND,
  message: ReasonPhrases.NOT_FOUND,
}
