import { QueryStatus } from 'react-query'

import { Error } from '../../../../domain/entity/error'
import {
  Result,
  Params,
} from '../../../../domain/entity/population/composition/per-year'
import { Prefecture } from '../../../../domain/entity/prefectures'

export interface Props {
  prefecturesData: Prefecture[]
  prefecturesDataStatus: QueryStatus
  prefecturesDataError: Error

  prefCodesOnQuery: Prefecture['prefCode'][]

  populationData: {
    extensions: Params | undefined
    result: Result['data'][number] | undefined
  }[]
  populationDataIsFetching: boolean
  populationDataErrors: Error[]

  onChangePrefCodes: (newPrefCodes: Prefecture['prefCode'][]) => void
}
