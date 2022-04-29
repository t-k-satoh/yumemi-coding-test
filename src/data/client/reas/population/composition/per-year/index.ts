import { AxiosRequestConfig } from 'axios'
import { instance } from '../../../instance'
import { APIResponse } from '../../../interface'

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
  const temp: Params = { prefCode: params.prefCode, cityCode: params.cityCode }

  if (typeof params['addArea'] === 'undefined') {
    temp['addArea'] = params['addArea']
  }

  return temp
}

export const getPerYear = async (params: Params, config?: AxiosRequestConfig) =>
  await instance.get<APIResponse<Result>>(
    'api/v1/population/composition/perYear',
    { ...config, params: { ...config.params, ...generateParams(params) } }
  )
