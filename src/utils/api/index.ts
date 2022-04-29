import { AxiosRequestConfig } from 'axios'

export const createAPIConfig = (): AxiosRequestConfig => ({
  baseURL: process.env.API_URL ?? 'http://localhost:3000',
  auth: {
    username: process.env.BASIC_AUTH_USER,
    password: process.env.BASIC_AUTH_PASSWORD,
  },
})
