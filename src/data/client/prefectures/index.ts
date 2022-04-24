import { instance } from '..'
import { APIResponse } from '../interface'

interface Prefecture {
  prefCode: number
  prefName: string
}

export const getPrefecture = async () =>
  await instance.get<APIResponse<Prefecture[]>>('api/v1/prefectures')
