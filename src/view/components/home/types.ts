import { Prefecture } from '../../../domain/entity/prefectures'
import { perYearUseCase } from '../../../use-case/population/composition/per-year/'

export interface Props {
  prefectures: Prefecture[]
  prefCodesOnQuery: Prefecture['prefCode'][]
  listPerYearQueries: ReturnType<
    typeof perYearUseCase['useListPerYear']
  >['listPerYearQueries']
  onChangePrefCodes: (newPrefCodes: Prefecture['prefCode'][]) => void
}
