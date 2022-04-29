import React from 'react'

import { useQuery, UseQueryOptions } from 'react-query'
import { PromiseType } from 'utility-types'

import { client } from '../../../data/client/bff'
import { PrefecturesRepository } from '../../../data/repository/prefectures'

import { KEYS } from '../../keys'

type Data = PromiseType<ReturnType<PrefecturesRepository['getPrefectures']>>

type Options = UseQueryOptions<
  Data,
  undefined,
  Data,
  [typeof KEYS.GET_PREFECTURES]
>

export const useGetPrefectures = (initialOptions?: Options) => {
  const prefecturesRepository = new PrefecturesRepository(client)

  const [options, setOptions] = React.useState<Options | undefined>(
    initialOptions
  )

  const handleOptions = React.useCallback((newOptions: Options) => {
    setOptions((current) => ({ ...current, ...newOptions }))
  }, [])

  return {
    ...useQuery<Data, { error: '?' }, Data, [typeof KEYS.GET_PREFECTURES]>(
      [KEYS.GET_PREFECTURES],
      () => prefecturesRepository.getPrefectures(),
      {
        ...options,
      }
    ),
    options,
    handleOptions,
  }
}
