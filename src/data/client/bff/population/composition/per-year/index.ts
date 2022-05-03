import { AxiosRequestConfig } from 'axios'
import { instance } from '../../../instance'

interface Data {
  label: string
  data: { year: number; value: number; rate?: number }[]
}

interface Result {
  boundaryYear: number
  data: Data[]
}

interface Params {
  prefCode: number
  cityCode: number | '-'
  addArea?: string
}

const generateParams = (params: Params) => {
  const temp: {
    ['pref-code']: number
    ['city-code']: number | '-'
    ['add-area']?: string
  } = { ['pref-code']: params.prefCode, ['city-code']: params.cityCode }

  if (typeof params['addArea'] !== 'undefined') {
    temp['add-area'] = params['addArea']
  }

  return temp
}

export const getPerYear = async (
  params: Params,
  config?: AxiosRequestConfig
) => {
  const configParams =
    typeof config !== 'undefined' && typeof config.params !== 'undefined'
      ? config.params
      : {}

  return await instance.get<{
    message: null
    result: Result
    extensions: Params
  }>('api/population/composition/per-year', {
    ...config,
    params: { ...configParams, ...generateParams(params) },
  })
}
