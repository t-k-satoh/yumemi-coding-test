import { AxiosError } from 'axios'
import { PrefectureRepositoryInterface } from '../../../domain/repository-interface/prefectures'
import { client } from '../../client'

export class PrefecturesRepository implements PrefectureRepositoryInterface {
  private client: typeof client

  constructor(_client: typeof client) {
    this.client = _client
  }

  public getPrefectures: PrefectureRepositoryInterface['getPrefectures'] =
    async () => {
      try {
        const { data } = await this.client.prefectures.getPrefecture()

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
        const _error = error as AxiosError

        return {
          success: false,
          details: `${_error.response.status} ${_error.response.statusText}`,
        }
      }
    }
}
