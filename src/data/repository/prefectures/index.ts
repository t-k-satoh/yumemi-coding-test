import { client } from '../../client'
import { PrefecturesRepository } from './repository'

export const prefecturesRepository = new PrefecturesRepository(client)
