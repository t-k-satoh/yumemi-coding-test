import { testFunction } from './index'

describe(testFunction.name, () => {
  test('should return value', () => {
    const value = 'value'

    expect(testFunction(value)).toBe(value)
  })
})
