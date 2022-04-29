import React from 'react'

import { useQuery, UseQueryOptions } from 'react-query'
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

export const useGetPerYear = (
  initialParams: Params,
  initialOptions?: Options
) => {
  const perYearRepository = new PerYearRepository(client)

  const [params, setParams] = React.useState<Params>(initialParams)
  const [options, setOptions] = React.useState<Options | undefined>(
    initialOptions
  )

  const handleParams = React.useCallback((newParams: Params) => {
    setParams((current) => ({ ...current, ...newParams }))
  }, [])

  const removeParams = React.useCallback((paramsKey: keyof Params) => {
    setParams((current) => {
      delete current[paramsKey]
      return current
    })
  }, [])

  const handleOptions = React.useCallback((newOptions: Options) => {
    setOptions((current) => ({ ...current, ...newOptions }))
  }, [])

  return {
    ...useQuery<
      Data,
      Error,
      Data,
      [typeof KEYS.GET_POPULATION_COMPOSITION_PERYEAR, Params]
    >(
      [KEYS.GET_POPULATION_COMPOSITION_PERYEAR, params],
      () => perYearRepository.getPerYear(params),
      {
        ...options,
      }
    ),
    options,
    params,
    handleOptions,
    handleParams,
    removeParams,
  }
}
