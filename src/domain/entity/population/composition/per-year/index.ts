export interface Params {
  prefCode: number
  cityCode: number | '-'
  addArea?: string
}

interface Data {
  label: string
  data: { year: number; value: number; rate?: number }[]
}

export interface Result {
  boundaryYear: number
  data: Data[]
}
