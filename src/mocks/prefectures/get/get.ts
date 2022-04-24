import { StatusCodes } from 'http-status-codes'
import { rest } from 'msw'
import { Error } from '../../types'

import { result } from './constants'

export const get = rest.get('/prefectures', (req, res, ctx) => {
  const error = req.url.searchParams.get('error') as Error | null

  if (error === null) {
    return res(
      ctx.status(StatusCodes.OK),
      ctx.json({
        message: null,
        result,
      })
    )
  }

  switch (error) {
    case String(StatusCodes.BAD_REQUEST):
      return res(
        ctx.status(StatusCodes.OK),
        ctx.body(JSON.stringify(String(StatusCodes.BAD_REQUEST)))
      )

    case String(StatusCodes.FORBIDDEN):
      return res(
        ctx.status(StatusCodes.OK),
        ctx.json({
          statusCode: String(StatusCodes.FORBIDDEN),
          message: 'Forbidden.',
          description: '',
        })
      )

    case String(StatusCodes.NOT_FOUND):
      return res(
        ctx.status(StatusCodes.OK),
        ctx.json({
          statusCode: String(StatusCodes.NOT_FOUND),
          message: "404. That's an error.",
          description: 'The requested URL /404 was not found on this server.',
        })
      )

    case 'primitive_404':
      return res(
        ctx.status(StatusCodes.OK),
        ctx.body(JSON.stringify(String(StatusCodes.NOT_FOUND)))
      )

    default:
      return res(ctx.status(error))
  }
})
