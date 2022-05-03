import React from 'react'

import { Chart } from '../organisms/chart'
import { colors } from './constants'
import { defaultProps } from './default-props'
import { Props } from './types'
import { pickFetchingPrefCodeData, generatePopulationData } from './utils'

const Home: React.FC<Props> = (props) => {
  const {
    prefectures,
    prefCodesOnQuery,
    listPerYearQueries,
    onChangePrefCodes,
  } = {
    ...defaultProps,
    ...props,
  }
  const [selectedPrefCodes, setSelectedPrefCodes] =
    React.useState<number[]>(prefCodesOnQuery)

  const data = React.useMemo(
    () => generatePopulationData(prefectures, listPerYearQueries),
    [listPerYearQueries, prefectures]
  )

  const legends = React.useMemo(
    () =>
      selectedPrefCodes.map((selectedPrefCode) => ({
        dataKey: prefectures.find(
          ({ prefCode }) => prefCode === selectedPrefCode
        ).prefName,
        color: colors[selectedPrefCode],
      })),
    [prefectures, selectedPrefCodes]
  )

  const handleChangePrefCode = React.useCallback(
    (newPrefCode: number): React.ChangeEventHandler<HTMLInputElement> =>
      (e) => {
        const newPrefCodes = e.currentTarget.checked
          ? [...selectedPrefCodes, newPrefCode]
          : selectedPrefCodes.filter((prefCode) => prefCode !== newPrefCode)

        setSelectedPrefCodes(newPrefCodes)

        onChangePrefCodes(newPrefCodes)
      },
    [onChangePrefCodes, selectedPrefCodes]
  )

  return (
    <main>
      {prefectures.map((prefecture) => (
        <span key={prefecture.prefCode}>
          <label>
            <input
              type={'checkbox'}
              id={String(prefecture.prefCode)}
              name={'prefCode'}
              value={prefecture.prefCode}
              checked={selectedPrefCodes.some(
                (prefCode) => prefCode === prefecture.prefCode
              )}
              onChange={handleChangePrefCode(prefecture.prefCode)}
            />
            {prefecture.prefName}
          </label>
        </span>
      ))}
      <div style={{ height: '600px' }}>
        <Chart data={data} legends={legends} />
      </div>
    </main>
  )
}

const _Home = React.memo(Home)
export { _Home as Home }
