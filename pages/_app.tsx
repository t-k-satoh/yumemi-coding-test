import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { GlobalStyle } from '../src/styles/global'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* @ts-ignore */}
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default App
