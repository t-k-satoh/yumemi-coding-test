import { StatusCodes } from 'http-status-codes'

type NotFound = `${StatusCodes.NOT_FOUND}`

type BadRequest = `${StatusCodes.BAD_REQUEST}`

type Forbidden = `${StatusCodes.FORBIDDEN}`

export interface Success<Result> {
  message: null
  result: Result
}

interface Error {
  statusCode: Forbidden | NotFound
  message: string
  description: string
}

export type APIResponse<Result> =
  | Success<Result>
  | Error
  | NotFound
  | BadRequest
