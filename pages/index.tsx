import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { dehydrate, QueryClient, DehydratedState } from 'react-query'
import { KEYS } from '../src/use-case/keys'
import { prefecturesUseCase } from '../src/use-case/prefectures'
import { createAPIConfig } from '../src/utils/api'

interface Props {
  dehydratedState: DehydratedState
  error?: unknown
}

const Home: NextPage<Props> = (props) => {
  const { data } = prefecturesUseCase.useGetPrefectures()

  return (
    <>
      <Head>
        <title>フロントエンドコーディング試験</title>
      </Head>
      {JSON.stringify(data)}
      {JSON.stringify(props)}
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const queryClient = new QueryClient()
  const config = createAPIConfig()

  await queryClient.prefetchQuery([KEYS.GET_PREFECTURES], () =>
    prefecturesUseCase.getPrefectures(config)
  )
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
