import React from 'react'

import { Chart } from '../../organisms/chart'
import { colors } from './constants'
import { defaultProps } from './default-props'
import * as Styles from './styles'
import { Props } from './types'
import { generatePopulationData } from './utils'

const Home: React.FC<Props> = (props) => {
  const {
    populationData,
    populationDataIsFetching,
    populationDataErrors,
    prefecturesData,
    prefCodesOnQuery,
    onChangePrefCodes,
  } = {
    ...defaultProps,
    ...props,
  }

  const [selectedPrefCodes, setSelectedPrefCodes] =
    React.useState<number[]>(prefCodesOnQuery)

  const populationDataForChart = React.useMemo(
    () =>
      populationDataIsFetching || populationDataErrors.length > 0
        ? []
        : generatePopulationData(prefecturesData, populationData),
    [
      populationData,
      populationDataErrors.length,
      populationDataIsFetching,
      prefecturesData,
    ]
  )

  const legends = React.useMemo(
    () =>
      selectedPrefCodes.sort().map((selectedPrefCode) => ({
        dataKey: prefecturesData.find(
          ({ prefCode }) => prefCode === selectedPrefCode
        ).prefName,
        color: colors[selectedPrefCode - 1],
      })),
    [prefecturesData, selectedPrefCodes]
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

  const handleAllSelect = React.useCallback(() => {
    const newPrefCodes = prefecturesData.map(({ prefCode }) => prefCode)
    setSelectedPrefCodes(newPrefCodes)

    onChangePrefCodes(newPrefCodes)
  }, [onChangePrefCodes, prefecturesData])

  const handleClearSelect = React.useCallback(() => {
    setSelectedPrefCodes([])

    onChangePrefCodes([])
  }, [onChangePrefCodes])

  return (
    <Styles.Main>
      <button onClick={handleAllSelect}>すべて選択</button>
      <button onClick={handleClearSelect}>選択解除</button>
      <Styles.CheckBoxes>
        {prefecturesData.map((prefecture, index) => (
          <Styles.CheckBox key={prefecture.prefCode}>
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
              <Styles.Dot color={colors[index]} />
              {prefecture.prefName}
            </label>
          </Styles.CheckBox>
        ))}
      </Styles.CheckBoxes>

      <Styles.Cart>
        {populationDataIsFetching ? (
          <Styles.Loader />
        ) : (
          <Chart data={populationDataForChart} legends={legends} />
        )}
      </Styles.Cart>
    </Styles.Main>
  )
}

const _Home = React.memo(Home)
export { _Home as Home }
