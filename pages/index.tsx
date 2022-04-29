import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { prefecturesUseCase } from '../src/use-case/prefectures'

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
  return {
    props: {},
  }
}

export default Home
