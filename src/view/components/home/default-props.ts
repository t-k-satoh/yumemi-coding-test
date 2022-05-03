import { Props } from './types'

export const defaultProps: Props = {
  prefectures: [],
  listPerYearQueries: [],
  prefCodesOnQuery: [],
  onChangePrefCodes: function (): void {
    throw new Error('Function not implemented.')
  },
}
