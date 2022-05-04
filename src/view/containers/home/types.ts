import {
  Result,
  Params,
} from '../../../domain/entity/population/composition/per-year'

export interface ServerSideProps {
  prefCodesOnQuery: number[]
}

export type PopulationData = {
  extensions: Params | undefined
  result: Result['data'][number] | undefined
}[]
