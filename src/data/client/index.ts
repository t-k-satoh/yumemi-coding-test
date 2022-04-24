import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp',
  headers: { 'X-API-KEY': process.env.API_KEY },
})
