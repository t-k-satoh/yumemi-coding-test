import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { PrefecturesRepository } from '../src/data/repository/prefectures/repository'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>フロントエンドコーディング試験</title>
      </Head>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prefecturesRepository = new PrefecturesRepository()
  const prefectures = await prefecturesRepository.getPrefectures()

  console.log(prefectures)

  return {
    props: {},
  }
}

export default Home
