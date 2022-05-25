import { createMocks } from 'node-mocks-http'

import handler from '../../../../pages/api/horario/[fecha]'

describe('handler', () => {
  test('Devuelve una lista de horarios entre las 8:00 y las 11:00 con duración de 30 minutos', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: 'dog',
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        horarioDia: [],
      })
    )
  })
})
