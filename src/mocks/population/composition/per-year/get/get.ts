import { rest } from 'msw'

import { getMock } from '../../../../utils'
import { result } from './constants'

export const get = rest.get(
  'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
  (req, res, ctx) => getMock({ req, res, ctx, result })
)
