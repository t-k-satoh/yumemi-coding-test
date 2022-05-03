import { useRouter } from 'next/router'
import React from 'react'

import { Prefecture } from '../../../domain/entity/prefectures'
import { perYearUseCase } from '../../../use-case/population/composition/per-year'
import { prefecturesUseCase } from '../../../use-case/prefectures'
import { Home } from '../../components/home'
import { ServerSideProps } from './types'

const HomeContainer: React.FC<ServerSideProps> = ({ prefCodesOnQuery }) => {
  const router = useRouter()

  const { data: prefecturesData } = prefecturesUseCase.useGetPrefectures()

  const { listPerYearQueries, setOptions, setParams } =
    perYearUseCase.useListPerYear(
      prefCodesOnQuery.map((_newPrefCode) => ({
        cityCode: '-',
        prefCode: _newPrefCode,
      })),
      { enabled: prefCodesOnQuery.length > 0 }
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
      prefectures={prefecturesData.result}
      prefCodesOnQuery={prefCodesOnQuery}
      listPerYearQueries={listPerYearQueries}
      onChangePrefCodes={onChangePrefCodes}
    />
  )
}

const _HomeContainer = React.memo(HomeContainer)
export { _HomeContainer as HomeContainer }
