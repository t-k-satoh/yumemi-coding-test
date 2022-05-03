import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { dehydrate, QueryClient, DehydratedState } from 'react-query'

import { KEYS } from '../../use-case/keys'
import { perYearUseCase } from '../../use-case/population/composition/per-year'
import { prefecturesUseCase } from '../../use-case/prefectures'
import { createAPIConfig } from '../../utils/api'
import { HomeContainer } from '../../view/containers/home'
import { getPrefCodes } from './utils'

interface Props {
  dehydratedState: DehydratedState
  prefCodesOnQuery: number[]
}

const Home: NextPage<Props> = ({ prefCodesOnQuery }) => {
  return (
    <>
      <Head>
        <title>フロントエンドコーディング試験</title>
      </Head>
      <HomeContainer prefCodesOnQuery={prefCodesOnQuery} />
    </>
  )
}

const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const queryClient = new QueryClient()
  const config = createAPIConfig()
  const prefCodesOnQuery = getPrefCodes(ctx.query['pref-code'])

  await queryClient.prefetchQuery([KEYS.GET_PREFECTURES], () =>
    prefecturesUseCase.getPrefectures(config)
  )

  for (const prefCode of prefCodesOnQuery) {
    await queryClient.prefetchQuery(
      [KEYS.GET_POPULATION_COMPOSITION_PERYEAR, { cityCode: '-', prefCode }],
      () => perYearUseCase.getPerYear({ cityCode: '-', prefCode }, config)
    )
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      prefCodesOnQuery,
    },
  }
}

export { getServerSideProps, Home }
