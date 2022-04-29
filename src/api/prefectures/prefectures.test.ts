import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'
import httpMocks from 'node-mocks-http'

import { result } from '../../../src/mocks/prefectures/get/constants'
import { Error } from '../../../src/mocks/types'
import { Error as ErrorResponse } from '../error'

import { prefectures as handler } from '.'

const isValidJson = (text: string) => {
  try {
    JSON.parse(text)
    return true
  } catch {
    return false
  }
}

describe('/api/prefectures', () => {
  test(`${StatusCodes.OK}`, async () => {
    const mockReq = httpMocks.createRequest<NextApiRequest>({})
    const mockRes = httpMocks.createResponse<NextApiResponse>({})

    await handler(mockReq, mockRes)

    expect(mockRes.statusCode).toBe(StatusCodes.OK)
    expect(isValidJson(mockRes._getData())).toBe(true)

    const data = JSON.parse(mockRes._getData())

    expect(data).toStrictEqual({ message: null, result })
  })

  test(`${StatusCodes.BAD_REQUEST}`, async () => {
    const error: Error = StatusCodes.BAD_REQUEST

    const mockReq = httpMocks.createRequest<NextApiRequest>({
      query: { error },
    })
    const mockRes = httpMocks.createResponse<NextApiResponse>({})

    await handler(mockReq, mockRes)

    expect(mockRes.statusCode).toBe(StatusCodes.BAD_REQUEST)
    expect(isValidJson(mockRes._getData())).toBe(true)

    const data = JSON.parse(mockRes._getData()) as ErrorResponse

    expect(data.error).toBe(ReasonPhrases.BAD_REQUEST)
    expect(data.message).toBe(ReasonPhrases.BAD_REQUEST)
  })

  test(`${StatusCodes.FORBIDDEN}`, async () => {
    const error: Error = StatusCodes.FORBIDDEN

    const mockReq = httpMocks.createRequest<NextApiRequest>({
      query: { error },
    })
    const mockRes = httpMocks.createResponse<NextApiResponse>({})

    await handler(mockReq, mockRes)

    expect(mockRes.statusCode).toBe(StatusCodes.FORBIDDEN)
    expect(isValidJson(mockRes._getData())).toBe(true)

    const data = JSON.parse(mockRes._getData()) as ErrorResponse & {
      details: Record<string, unknown>
    }

    expect(data.error).toBe(ReasonPhrases.FORBIDDEN)
    expect(data.message).toBe(ReasonPhrases.FORBIDDEN)
    expect(data.details).toStrictEqual({
      description: '',
      message: 'Forbidden.',
      statusCode: '403',
    })
  })

  test(`${StatusCodes.NOT_FOUND}`, async () => {
    const error: Error = StatusCodes.NOT_FOUND

    const mockReq = httpMocks.createRequest<NextApiRequest>({
      query: { error },
    })
    const mockRes = httpMocks.createResponse<NextApiResponse>({})

    await handler(mockReq, mockRes)

    expect(mockRes.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(isValidJson(mockRes._getData())).toBe(true)

    const data = JSON.parse(mockRes._getData()) as ErrorResponse

    expect(data.error).toBe(ReasonPhrases.NOT_FOUND)
    expect(data.message).toBe(ReasonPhrases.NOT_FOUND)
    expect(data.details).toStrictEqual({
      description: 'The requested URL /404 was not found on this server.',
      message: "404. That's an error.",
      statusCode: '404',
    })
  })

  test('primitive_404', async () => {
    const error: Error = 'primitive_404'

    const mockReq = httpMocks.createRequest<NextApiRequest>({
      query: { error },
    })
    const mockRes = httpMocks.createResponse<NextApiResponse>({})

    await handler(mockReq, mockRes)

    expect(mockRes.statusCode).toBe(StatusCodes.NOT_FOUND)
    expect(isValidJson(mockRes._getData())).toBe(true)

    const data = JSON.parse(mockRes._getData()) as ErrorResponse

    expect(data.error).toBe(ReasonPhrases.NOT_FOUND)
    expect(data.message).toBe(ReasonPhrases.NOT_FOUND)
  })

  test(`${StatusCodes.TOO_MANY_REQUESTS}`, async () => {
    const error: Error = StatusCodes.TOO_MANY_REQUESTS

    const mockReq = httpMocks.createRequest<NextApiRequest>({
      query: { error },
    })
    const mockRes = httpMocks.createResponse<NextApiResponse>({})

    await handler(mockReq, mockRes)

    expect(mockRes.statusCode).toBe(StatusCodes.TOO_MANY_REQUESTS)
    expect(isValidJson(mockRes._getData())).toBe(true)

    const data = JSON.parse(mockRes._getData()) as ErrorResponse

    expect(data.error).toBe(ReasonPhrases.TOO_MANY_REQUESTS)
  })

  test(`${StatusCodes.INTERNAL_SERVER_ERROR}`, async () => {
    const error: Error = StatusCodes.INTERNAL_SERVER_ERROR

    const mockReq = httpMocks.createRequest<NextApiRequest>({
      query: { error },
    })
    const mockRes = httpMocks.createResponse<NextApiResponse>({})

    await handler(mockReq, mockRes)

    expect(mockRes.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
    expect(isValidJson(mockRes._getData())).toBe(true)

    const data = JSON.parse(mockRes._getData()) as ErrorResponse

    expect(data.error).toBe(ReasonPhrases.INTERNAL_SERVER_ERROR)
  })
})
