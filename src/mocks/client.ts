import axios from 'axios'
import { client } from '../data/client/reas'
import { Error } from './types'

export const generateClient = (error?: Error): typeof client => {
  const params = typeof error !== 'undefined' && { error }

  return {
    prefectures: {
      getPrefecture: async () => await axios.get('/prefectures', { params }),
    },
  }
}
