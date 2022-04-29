import { AxiosRequestConfig } from 'axios'
import { instance } from '../instance'

interface Prefecture {
  prefCode: number
  prefName: string
}

export const getPrefecture = async (config?: AxiosRequestConfig) =>
  await instance.get<{
    message: null
    result: Prefecture[]
  }>('/api/prefectures', config)
