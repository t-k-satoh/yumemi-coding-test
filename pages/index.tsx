import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { prefecturesUseCase } from '../src/use-case/prefectures'
import { createAPIConfig } from '../src/utils/api'

const Home: NextPage = () => {
  const { data } = prefecturesUseCase.useGetPrefectures()

  return (
    <>
      <Head>
        <title>フロントエンドコーディング試験</title>
      </Head>
      {JSON.stringify(data)}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const config = createAPIConfig()

  const prefectures = await prefecturesUseCase.getPrefectures(config)

  console.log(prefectures)

  return {
    props: {},
  }
}

export default Home
