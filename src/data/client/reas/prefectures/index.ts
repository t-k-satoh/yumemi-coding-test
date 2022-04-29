import { AxiosRequestConfig } from 'axios'
import { instance } from '../instance'
import { APIResponse } from '../interface'

interface Prefecture {
  prefCode: number
  prefName: string
}

export const getPrefecture = async (config?: AxiosRequestConfig) =>
  await instance.get<APIResponse<Prefecture[]>>('api/v1/prefectures', config)
