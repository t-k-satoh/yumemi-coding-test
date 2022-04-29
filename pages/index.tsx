import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import { Prefecture } from '../src/domain/entity/prefectures'
import { prefecturesUseCase } from '../src/use-case/prefectures'
import { createAPIConfig } from '../src/utils/api'

interface Props {
  prefectures: Prefecture[]
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
  const config = createAPIConfig()
  try {
    const data = await prefecturesUseCase.getPrefectures(config)
    return {
      props: {
        prefectures: data.result,
      },
    }
  } catch (error) {
    return {
      props: {
        prefectures: [],
        error: { ...error, config },
      },
    }
  }
}

export default Home
