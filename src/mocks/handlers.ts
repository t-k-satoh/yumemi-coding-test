import { perYear } from './population/composition/per-year'
import { prefectures } from './prefectures'

export const handlers = [prefectures.get, perYear.get]
