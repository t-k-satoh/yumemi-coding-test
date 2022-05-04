import React from 'react'

import { useQueries, UseQueryOptions } from 'react-query'
import { PromiseType } from 'utility-types'

import { client } from '../../../../../data/client/bff'
import { PerYearRepository } from '../../../../../data/repository/population/composition/per-year'
import { Error } from '../../../../../domain/entity/error'

import { KEYS } from '../../../../keys'

type Params = Parameters<PerYearRepository['getPerYear']>[0]

type Data = PromiseType<ReturnType<PerYearRepository['getPerYear']>>

type Options = UseQueryOptions<
  Data,
  Error,
  Data,
  [typeof KEYS.GET_POPULATION_COMPOSITION_PERYEAR, Params]
>

export const useListPerYear = (
  initialParams: Params[],
  initialOptions?: Options
) => {
  const perYearRepository = new PerYearRepository(client)

  const [params, setParams] = React.useState<Params[]>(initialParams)
  const [options, setOptions] = React.useState<Options | undefined>(
    initialOptions
  )

  const listPerYearQueries = useQueries(
    params.map(({ cityCode, prefCode, addArea }) => {
      const _options: Options = {
        ...options,
        queryKey: [
          KEYS.GET_POPULATION_COMPOSITION_PERYEAR,
          { cityCode, prefCode, addArea },
        ],
        queryFn: async () => {
          const data = await perYearRepository.getPerYear({
            cityCode,
            prefCode,
            addArea,
          })

          return data
        },
      }

      return _options
    })
  )

  return {
    listPerYearQueries,
    params,
    options,
    setParams,
    setOptions,
  }
}
