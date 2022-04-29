import { getPerYear } from './population/composition/per-year'
import { getPrefecture } from './prefectures'

export const client = {
  prefectures: { getPrefecture },
  population: { composition: { perYear: { getPerYear } } },
}
