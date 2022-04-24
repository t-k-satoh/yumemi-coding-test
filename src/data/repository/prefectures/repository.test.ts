import { generateClient } from '../../../mocks/client'
import { result } from '../../../mocks/prefectures/get/constants'
import { PrefecturesRepository } from './repository'

describe(PrefecturesRepository.name, () => {
  test(`Success: getPrefectures`, async () => {
    const client = generateClient()
    const prefecturesRepository = new PrefecturesRepository(client)

    const response = await prefecturesRepository.getPrefectures()

    expect(response.success).toBe(true)

    if (response.success) {
      expect(response.data).toStrictEqual(result)
    }
  })

  test(`Failed: with 400`, async () => {
    const client = generateClient(400)
    const prefecturesRepository = new PrefecturesRepository(client)

    const response = await prefecturesRepository.getPrefectures()

    expect(response.success).toBe(false)
    expect('details' in response).toBe(true)

    if ('details' in response) {
      expect(typeof response.details === 'string').toBe(true)
    }

    if (
      !response.success &&
      'details' in response &&
      typeof response.details === 'string'
    ) {
      expect(response.details).toBe('400')
    }
  })

  test(`Failed: with 403`, async () => {
    const client = generateClient(403)
    const prefecturesRepository = new PrefecturesRepository(client)

    const response = await prefecturesRepository.getPrefectures()

    expect(response.success).toBe(false)
    expect('details' in response).toBe(true)

    if ('details' in response) {
      expect(typeof response.details === 'object').toBe(true)
    }

    if (
      !response.success &&
      'details' in response &&
      typeof response.details === 'object'
    ) {
      expect('statusCode' in response.details).toBe(true)
      expect('message' in response.details).toBe(true)
      expect('description' in response.details).toBe(true)
    }
  })

  test(`Failed: with 404`, async () => {
    const client = generateClient(404)
    const prefecturesRepository = new PrefecturesRepository(client)

    const response = await prefecturesRepository.getPrefectures()

    expect(response.success).toBe(false)
    expect('details' in response).toBe(true)

    if (
      !response.success &&
      'details' in response &&
      typeof response.details === 'object'
    ) {
      expect('statusCode' in response.details).toBe(true)
      expect('message' in response.details).toBe(true)
      expect('description' in response.details).toBe(true)
    }
  })

  test(`Failed: with primitive_404`, async () => {
    const client = generateClient('primitive_404')
    const prefecturesRepository = new PrefecturesRepository(client)

    const response = await prefecturesRepository.getPrefectures()

    expect(response.success).toBe(false)
    expect('details' in response).toBe(true)

    if ('details' in response) {
      expect(typeof response.details === 'string').toBe(true)
    }

    if (
      !response.success &&
      'details' in response &&
      typeof response.details === 'string'
    ) {
      expect(response.details).toBe('404')
    }
  })

  test(`Failed: with 429`, async () => {
    const client = generateClient(429)
    const prefecturesRepository = new PrefecturesRepository(client)

    const response = await prefecturesRepository.getPrefectures()

    expect(response.success).toBe(false)
    expect('details' in response).toBe(true)

    if ('details' in response) {
      expect(typeof response.details === 'string').toBe(true)
    }

    if (
      !response.success &&
      'details' in response &&
      typeof response.details === 'string'
    ) {
      expect(response.details).toBe('429 Too Many Requests')
    }
  })
})
