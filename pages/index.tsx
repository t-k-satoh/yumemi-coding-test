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
  const [prefCodes, setPrefCodes] = React.useState<number[]>([])

  const { data: prefectures } = prefecturesUseCase.useGetPrefectures()

  const { listPerYearQueries, setOptions, setParams } =
    perYearUseCase.useListPerYear([], { enabled: false })

  const result = listPerYearQueries.map(
    (listPerYearQuery) => listPerYearQuery.data
  )

  const onChangePrefCode: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        const newPrefCode = e.currentTarget.value
        setOptions({ enabled: true })

        if (e.currentTarget.checked) {
          setPrefCodes((current) => {
            const newPrefCodes = [...current, Number(newPrefCode)]
            setParams(
              newPrefCodes.map((_newPrefCode) => ({
                cityCode: '-',
                prefCode: _newPrefCode,
              }))
            )

            return newPrefCodes
          })
          return
        } else {
          setPrefCodes((current) => {
            const newPrefCodes = current.filter(
              (prefCode) => prefCode !== Number(newPrefCode)
            )

            setParams(
              newPrefCodes.map((_newPrefCode) => ({
                cityCode: '-',
                prefCode: _newPrefCode,
              }))
            )

            return newPrefCodes
          })
        }
      },
      [setOptions, setParams]
    )

  if (typeof prefectures === 'undefined') {
    return null
  }

  return (
    <>
      <Head>
        <title>フロントエンドコーディング試験</title>
      </Head>
      <div>
        {JSON.stringify(prefCodes)}
        {prefectures.result.map((prefecture) => (
          <div key={prefecture.prefCode}>
            <label>
              <input
                type={'checkbox'}
                id={String(prefecture.prefCode)}
                name={'prefCode'}
                value={prefecture.prefCode}
                checked={prefCodes.some(
                  (prefCode) => prefCode === prefecture.prefCode
                )}
                onChange={onChangePrefCode}
              />
              {prefecture.prefName}
            </label>
          </div>
        ))}
      </div>
      <div>{JSON.stringify(result)}</div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const queryClient = new QueryClient()
  const config = createAPIConfig()

  await queryClient.prefetchQuery([KEYS.GET_PREFECTURES], () =>
    prefecturesUseCase.getPrefectures(config)
  )

  // for (let index = 1; index < 48; index++) {
  //   await queryClient.prefetchQuery(
  //     [
  //       KEYS.GET_POPULATION_COMPOSITION_PERYEAR,
  //       { cityCode: '-', prefCode: index },
  //     ],
  //     () =>
  //       perYearUseCase.getPerYear({ cityCode: '-', prefCode: index }, config)
  //   )
  // }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
