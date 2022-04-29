import { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'

import { reasClient } from '../../../src/data/client'
import { badRequest, notFound, forbidden, methodNotAllowed } from '../error'

const path = '/api/prefectures'

// https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html
export const prefectures = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'GET') {
    // [TODO] よくない実装、テスト用コードが入り込んでいる
    const error =
      process.env.NODE_ENV === 'test' && 'error' in req.query
        ? { error: req.query.error }
        : undefined

    try {
      const { data } = await reasClient.prefectures.getPrefecture({
        params: error,
      })

      if (data === '400') {
        res.status(StatusCodes.BAD_REQUEST)
        res.end(JSON.stringify(badRequest))
        return
      }

      if (data === '404') {
        res.status(StatusCodes.NOT_FOUND)
        res.end(JSON.stringify(notFound))
        return
      }

      if ('statusCode' in data || 'description' in data) {
        if (data.statusCode === '403') {
          res.status(StatusCodes.FORBIDDEN)
          res.end(
            JSON.stringify({
              ...forbidden,
              path,
              details: data,
            })
          )
          return
        }

        if (data.statusCode === '404') {
          console.log(req)
          res.status(StatusCodes.NOT_FOUND)
          res.end(JSON.stringify({ ...notFound, details: data, path }))
          return
        }
      }

      res.setHeader('Content-Type', 'text/plain;charset=utf-8')
      res.status(StatusCodes.OK)
      res.end(JSON.stringify(data))
    } catch (error) {
      const _error = error as AxiosError

      res.status(Number(_error.response.status))
      res.end(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          status: Number(_error.response.status),
          error: _error.response.statusText,
          message: _error.message,
        })
      )
    }
    return
  }

  res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .end(JSON.stringify({ ...methodNotAllowed, path }))
}
