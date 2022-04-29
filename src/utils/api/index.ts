import { AxiosRequestConfig } from 'axios'

export const createAPIConfig = (): AxiosRequestConfig => ({
  baseURL: process.env.API_URL ?? 'http://localhost:3000',
})
