import { PerYearRepositoryInterface } from '../../../../../domain/repository-interface/population/composition/per-year'
import { bffClient } from '../../../../client'

export class PerYearRepository implements PerYearRepositoryInterface {
  private client: typeof bffClient

  constructor(_client: typeof bffClient) {
    this.client = _client
  }

  public getPerYear: PerYearRepositoryInterface['getPerYear'] = async (
    params,
    config
  ) => {
    const { data } =
      await this.client.population.composition.perYear.getPerYear(
        params,
        config
      )

    return data
  }
}
