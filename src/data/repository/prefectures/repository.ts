import { PrefectureRepositoryInterface } from '../../../domain/repository-interface/prefectures'
import { bffClient } from '../../client'

export class PrefecturesRepository implements PrefectureRepositoryInterface {
  private client: typeof bffClient

  constructor(_client: typeof bffClient) {
    this.client = _client
  }

  public getPrefectures: PrefectureRepositoryInterface['getPrefectures'] =
    async (config) => {
      const { data } = await this.client.prefectures.getPrefecture(config)

      return data
    }
}
