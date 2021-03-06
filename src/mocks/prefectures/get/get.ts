import { rest } from 'msw'

import { getMock } from '../../utils'
import { result } from './constants'

export const get = rest.get(
  'https://opendata.resas-portal.go.jp/api/v1/prefectures',
  (req, res, ctx) => getMock({ req, res, ctx, result })
)
