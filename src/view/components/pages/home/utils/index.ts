import { Props } from '../types'

export const generatePopulationData = (
  prefecturesData: Props['prefecturesData'],
  populationData: Props['populationData']
) => {
  const temp: {
    [key: number]: {
      prefName: string
      value: number
    }[]
  } = {}

  populationData.forEach(({ result }) => {
    result.data.forEach(({ year }) => {
      temp[year] = []
    })
  })

  populationData.forEach(({ result, extensions }) => {
    const prefName = prefecturesData.find(
      (prefecture) => prefecture.prefCode === extensions.prefCode
    ).prefName

    result.data.forEach(({ year, value }) => {
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
