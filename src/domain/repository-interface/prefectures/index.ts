import { Prefecture } from '../../entity/prefectures'
import { APIResponse } from '../../entity/utils'

export interface PrefectureRepositoryInterface {
  getPrefectures: () => Promise<APIResponse<Prefecture[]>>
}
