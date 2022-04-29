import { AxiosRequestConfig } from 'axios'
import { Prefecture } from '../../entity/prefectures'

export interface PrefectureRepositoryInterface {
  getPrefectures: (config?: AxiosRequestConfig) => Promise<Prefecture[]>
}
