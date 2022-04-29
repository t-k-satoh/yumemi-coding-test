import axios from 'axios'

export const instance = axios.create({
  baseURL: '',
  headers: { 'X-API-KEY': process.env.API_KEY },
})
