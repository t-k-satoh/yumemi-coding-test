import { AxiosRequestConfig } from 'axios'

import { client } from '../../../data/client/bff'
import { PrefecturesRepository } from '../../../data/repository/prefectures'
import { useGetPrefectures } from './hooks'

const prefecturesRepository = new PrefecturesRepository(client)

export const getPrefectures = (config?: AxiosRequestConfig) => {
  return prefecturesRepository.getPrefectures(config)
}
export { useGetPrefectures }
