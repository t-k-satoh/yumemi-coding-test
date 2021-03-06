import { AxiosError } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'

import { reasClient } from '../../../../data/client'
import {
  badRequest,
  notFound,
  forbidden,
  methodNotAllowed,
} from '../../../error'
import { isValidNumber } from './utils'

const path = '/api/population/composition/per-year'

// https://opendata.resas-portal.go.jp/docs/api/v1/detail/index.html
export const perYear = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')

  if (req.method === 'GET') {
    // [TODO] よくない実装、テスト用コードが入り込んでいる
    const error =
      process.env.NODE_ENV === 'test' && 'error' in req.query
        ? { error: req.query.error }
        : undefined

    if (!('pref-code' in req.query) || !('city-code' in req.query)) {
      res.status(StatusCodes.BAD_REQUEST)
      res.end(
        JSON.stringify({
          ...badRequest,
          details: `'pref-code' or 'city-code' is missing as a parameter.`,
        })
      )
      return
    }

    if (
      !isValidNumber(req.query['pref-code']) ||
      (req.query['city-code'] !== '-' && !isValidNumber(req.query['city-code']))
    ) {
      res.status(StatusCodes.BAD_REQUEST)
      res.end(
        JSON.stringify({
          ...badRequest,
          details: `'pref-code' or 'city-code' is invalid.`,
        })
      )
      return
    }

    const params = {
      prefCode: Number(req.query['pref-code']),
      cityCode:
        req.query['city-code'] === '-'
          ? ('-' as const)
          : Number(req.query['city-code']),
    }

    if (typeof req.query['add-area'] !== 'undefined') {
      params['add-area'] = req.query['add-area']
    }

    try {
      const { data } =
        await reasClient.population.composition.perYear.getPerYear(params, {
          params: error,
        })

      if (data === '400') {
        res.status(StatusCodes.BAD_REQUEST)
        res.end(JSON.stringify({ ...badRequest, details: { data, params } }))
        return
      }

      if (data === '404') {
        res.status(StatusCodes.NOT_FOUND)
        res.end(JSON.stringify({ ...notFound, details: { data, params } }))
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
          res.status(StatusCodes.NOT_FOUND)
          res.end(
            JSON.stringify({ ...notFound, details: { data, params }, path })
          )
          return
        }
      }

      const extensions: {
        prefCode: number
        cityCode: number | '-'
        addArea?: string
      } = {
        prefCode: params.prefCode,
        cityCode: params.cityCode,
      }

      if (typeof req.query['add-area'] !== 'undefined') {
        extensions['addArea'] = String(req.query['add-area'])
      }

      res.status(StatusCodes.OK)
      res.end(
        JSON.stringify({
          ...data,
          extensions,
        })
      )
    } catch (error) {
      const _error = error as AxiosError

      res.status(Number(_error.response.status))
      res.end(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          status: Number(_error.response.status),
          error: _error.response.statusText,
          message: _error.message,
          details: { params },
        })
      )
    }
    return
  }

  res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .end(JSON.stringify({ ...methodNotAllowed, path }))
}
