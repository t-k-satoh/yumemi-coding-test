export const isValidNumber = (maybeNumber: string | string[]) => {
  if (typeof maybeNumber !== 'string') {
    return false
  }

  return !Number.isNaN(Number(maybeNumber))
}
