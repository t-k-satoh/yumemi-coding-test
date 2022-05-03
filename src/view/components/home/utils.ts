import { Props } from './types'

export const pickFetchingPrefCodeData = (
  selectedPrefCodes: number[],
  listPerYearQueries: Props['listPerYearQueries']
): number[] =>
  selectedPrefCodes.filter((_, index) => listPerYearQueries[index].isFetching)

export const pickErrorPrefCodeData = (
  selectedPrefCodes: number[],
  listPerYearQueries: Props['listPerYearQueries']
) =>
  selectedPrefCodes
    .filter((_, index) => listPerYearQueries[index].isError)
    .map((_, index) => {
      const { error } = listPerYearQueries[index]

      return error
    })

export const generatePopulationData = (
  prefectures: Props['prefectures'],
  listPerYearQueries: Props['listPerYearQueries']
) => {
  const temp: {
    [key: number]: {
      prefName: string
      value: number
    }[]
  } = {}

  listPerYearQueries
    .filter(({ data }) => typeof data !== 'undefined')
    .forEach(({ data: { result } }) => {
      result.data
        .find(({ label }) => label === '総人口')
        .data.forEach(({ year }) => {
          temp[year] = []
        })
    })

  listPerYearQueries
    .filter(({ data }) => typeof data !== 'undefined')
    .forEach(({ data: { result, extensions } }) => {
      const prefName = prefectures.find(
        (prefecture) => prefecture.prefCode === extensions.prefCode
      ).prefName

      result.data
        .find(({ label }) => label === '総人口')
        .data.forEach(({ year, value }) => {
          temp[year].push({ prefName, value })
        })
    })

  return Object.entries(temp).map((entry) => {
    const prefData = entry[1]
    const _temp = {}

    for (const iterator of prefData) {
      _temp[iterator['prefName']] = iterator['value']
    }

    return { ..._temp, name: entry[0] }
  })
}
