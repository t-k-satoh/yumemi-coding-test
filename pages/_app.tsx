import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { GlobalStyle } from '../src/styles/global'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* @ts-ignore */}
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App
