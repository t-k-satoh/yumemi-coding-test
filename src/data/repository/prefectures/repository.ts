import { PrefectureRepositoryInterface } from '../../../domain/repository-interface/prefectures'
import { getPrefecture } from '../../client/prefectures'

export class PrefecturesRepository implements PrefectureRepositoryInterface {
  public getPrefectures: PrefectureRepositoryInterface['getPrefectures'] =
    async () => {
      try {
        const { data } = await getPrefecture()

        if (data === '400' || data === '404') {
          return {
            success: false,
            details: data,
          }
        }

        if ('statusCode' in data || 'description' in data) {
          return {
            success: false,
            details: data,
          }
        }

        return {
          success: true,
          data: data.result,
        }
      } catch (error) {
        return {
          success: false,
          details: error,
        }
      }
    }
}
