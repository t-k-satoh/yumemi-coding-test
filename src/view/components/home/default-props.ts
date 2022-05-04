import { Props } from './types'

export const defaultProps: Props = {
  prefecturesData: [],
  prefecturesDataStatus: 'idle',
  prefecturesDataError: undefined,
  prefCodesOnQuery: [],
  populationData: [],
  populationDataIsFetching: false,
  populationDataErrors: [],
  onChangePrefCodes: function (): void {
    throw new Error('Function not implemented.')
  },
}
