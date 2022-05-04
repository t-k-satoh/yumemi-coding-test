import { useRouter } from 'next/router'
import React from 'react'

import { Prefecture } from '../../../domain/entity/prefectures'
import { perYearUseCase } from '../../../use-case/population/composition/per-year'
import { prefecturesUseCase } from '../../../use-case/prefectures'
import { Home } from '../../components/home'
import { ServerSideProps, PopulationData } from './types'

const HomeContainer: React.FC<ServerSideProps> = ({ prefCodesOnQuery }) => {
  const router = useRouter()

  const {
    data: prefecturesData,
    status: prefecturesDataStatus,
    error: prefecturesDataError,
  } = prefecturesUseCase.useGetPrefectures()

  const { listPerYearQueries, setOptions, setParams } =
    perYearUseCase.useListPerYear(
      prefCodesOnQuery.map((_newPrefCode) => ({
        cityCode: '-',
        prefCode: _newPrefCode,
      })),
      { enabled: prefCodesOnQuery.length > 0 }
    )

  const populationData: PopulationData = React.useMemo(
    () =>
      listPerYearQueries.map(({ data }) => {
        if (typeof data === 'undefined') {
          return {
            extensions: undefined,
            result: undefined,
          }
        }

        const { extensions, result } = data

        const _data = result.data.find(({ label }) => label === '総人口')

        if (typeof _data === 'undefined') {
          return {
            extensions,
            result: undefined,
          }
        }

        return {
          extensions,
          result: _data,
        }
      }),
    [listPerYearQueries]
  )

  const populationDataErrors = React.useMemo(
    () =>
      listPerYearQueries
        .map(({ error }) => error)
        .filter((error) => error !== null),
    [listPerYearQueries]
  )

  const populationDataIsFetching = React.useMemo(
    () =>
      listPerYearQueries
        .map(({ isFetching }) => isFetching)
        .some((isFetching) => isFetching),
    [listPerYearQueries]
  )

  const onChangePrefCodes: (newPrefCodes: Prefecture['prefCode'][]) => void =
    React.useCallback(
      (newPrefCodes) => {
        setOptions({ enabled: true })
        setParams(
          newPrefCodes.map((_newPrefCode) => ({
            cityCode: '-',
            prefCode: _newPrefCode,
          }))
        )

        router.push(
          '/',
          { pathname: '/', query: { ['pref-code']: newPrefCodes } },
          { shallow: true }
        )
      },
      [router, setOptions, setParams]
    )

  if (typeof prefecturesData === 'undefined') {
    return null
  }

  return (
    <Home
      prefecturesData={prefecturesData.result}
      prefecturesDataStatus={prefecturesDataStatus}
      prefecturesDataError={prefecturesDataError}
      prefCodesOnQuery={prefCodesOnQuery}
      populationData={populationData}
      populationDataIsFetching={populationDataIsFetching}
      populationDataErrors={populationDataErrors}
      onChangePrefCodes={onChangePrefCodes}
    />
  )
}

const _HomeContainer = React.memo(HomeContainer)
export { _HomeContainer as HomeContainer }
