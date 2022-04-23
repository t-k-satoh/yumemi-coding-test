import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background-color: #ffffff;
    color: #3A3A3A;
    font-family: "Helvetica Neue",Arial,"Hiragino Kaku Gothic ProN","Hiragino Sans",Meiryo,sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`
