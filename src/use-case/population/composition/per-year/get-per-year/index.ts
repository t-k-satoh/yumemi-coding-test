import { AxiosRequestConfig } from 'axios'

import { client } from '../../../../../data/client/bff'
import { PerYearRepository } from '../../../../../data/repository/population/composition/per-year'
import { useGetPerYear } from './hooks'

const perYearRepository = new PerYearRepository(client)

export const getPerYear = (
  params: Parameters<PerYearRepository['getPerYear']>[0],
  config?: AxiosRequestConfig
) => {
  return perYearRepository.getPerYear(params, config)
}
export { useGetPerYear }
