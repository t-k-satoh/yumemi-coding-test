import { AxiosRequestConfig } from 'axios'
import {
  Result,
  Params,
} from '../../../../entity/population/composition/per-year'

export interface PerYearRepositoryInterface {
  getPerYear: (
    params: Params,
    config?: AxiosRequestConfig
  ) => Promise<{ message: null; result: Result }>
}
