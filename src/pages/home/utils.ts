export const isValidNumber = (maybeNumber: string | string[]) => {
  if (typeof maybeNumber !== 'string') {
    return false
  }

  return !Number.isNaN(Number(maybeNumber))
}

export const getPrefCodes = (
  maybePrefCodes: string | string[] | undefined
): number[] => {
  if (typeof maybePrefCodes === 'undefined') {
    return []
  }

  if (typeof maybePrefCodes === 'string') {
    if (
      isValidNumber(maybePrefCodes) &&
      Number(maybePrefCodes) > 0 &&
      Number(maybePrefCodes) < 48
    ) {
      return [Number(maybePrefCodes)]
    } else {
      return []
    }
  }

  if (maybePrefCodes.every((maybePrefCode) => isValidNumber(maybePrefCode))) {
    return maybePrefCodes
      .map((maybePrefCode) => Number(maybePrefCode))
      .filter(
        (maybePrefCode) =>
          Number(maybePrefCode) > 0 && Number(maybePrefCode) < 48
      )
  }

  return []
}
