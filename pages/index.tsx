import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { prefecturesRepository } from '../src/data/repository/prefectures'

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
  const prefectures = await prefecturesRepository.getPrefectures()

  console.log(prefectures)

  return {
    props: {},
  }
}

export default Home
