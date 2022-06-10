import { createMocks } from 'node-mocks-http'
import authMiddleware from './authMiddleware'

let session: {} | undefined
jest.mock('next-auth/react', () => ({
  __esModule: true,
  getSession: async () => session,
}))

describe('authMiddleware', () => {
  beforeEach(() => {
    session = {
      user: {},
    }
  })
  test('Devuelve mensaje que dice que tiene que autenticarse', async () => {
    session = undefined
    const { req, res } = createMocks()
    await authMiddleware(req, res)
    expect(res._getStatusCode()).toBe(401)
    expect(res._getJSONData()).toEqual({
      error: expect.any(String),
    })
  })
  test('Devuelve un estado exitoso', async () => {
    const { req, res } = createMocks()
    await authMiddleware(req, res)
    expect(res._getStatusCode()).toBe(200)
  })
})
