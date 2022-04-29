import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { dehydrate, QueryClient, DehydratedState } from 'react-query'
import { KEYS } from '../src/use-case/keys'
import { perYearUseCase } from '../src/use-case/population/composition/per-year'
import { prefecturesUseCase } from '../src/use-case/prefectures'
import { createAPIConfig } from '../src/utils/api'

interface Props {
  dehydratedState: DehydratedState
}

const Home: NextPage<Props> = () => {
  const [prefCode, setPrefCode] = React.useState<number | undefined>()

  const { data: prefectures } = prefecturesUseCase.useGetPrefectures()
  const { data: compositionPerYear, handleParams } =
    perYearUseCase.useGetPerYear(
      {
        cityCode: '-',
        prefCode: 13,
      },
      { enabled: true }
    )

  const onChangePrefCode: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newPrefCode = e.currentTarget.id

    setPrefCode(Number(newPrefCode))
    handleParams({ prefCode: Number(newPrefCode), cityCode: '-' })
  }

  console.log(compositionPerYear)

  if (typeof prefectures === 'undefined') {
    return null
  }

  return (
    <>
      <Head>
        <title>フロントエンドコーディング試験</title>
      </Head>
      <div>
        {prefCode}
        {prefectures.result.map((prefecture) => (
          <div key={prefecture.prefCode}>
            <label>
              <input
                type={'radio'}
                id={String(prefecture.prefCode)}
                name={'prefCode'}
                onChange={onChangePrefCode}
              />
              {prefecture.prefName}
            </label>
          </div>
        ))}
      </div>
      <div>{JSON.stringify(compositionPerYear)}</div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const queryClient = new QueryClient()
  const config = createAPIConfig()

  await queryClient.prefetchQuery([KEYS.GET_PREFECTURES], () =>
    prefecturesUseCase.getPrefectures(config)
  )
  await queryClient.prefetchQuery(
    [KEYS.GET_POPULATION_COMPOSITION_PERYEAR, { cityCode: '-', prefCode: 11 }],
    () => perYearUseCase.getPerYear({ cityCode: '-', prefCode: 11 }, config)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
