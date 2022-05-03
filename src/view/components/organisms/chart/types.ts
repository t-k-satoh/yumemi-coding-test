export interface Props {
  data: { name: number | string; [key: string]: number | string }[]
  legends: { dataKey: string; color: string }[]
}
