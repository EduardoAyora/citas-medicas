import { createMocks } from 'node-mocks-http'

import handler from '../../../../pages/api/horario/[fecha]'
import { prisma } from '../../../../lib/db'

describe('handler /horario/[fecha]', () => {
  beforeAll(async () => {
    await prisma.cita.createMany({
      data: [
        { id: 1, time: '11:30', durationInMinutes: 45 },
        { id: 2, time: '12:40', durationInMinutes: 45 },
      ],
    })
  })

  afterAll(async () => {
    await prisma.cita.deleteMany()
  })

  test('Devuelve un estado de error al no dar una fecha válida', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
    expect(res._getJSONData()).toEqual({
      message: expect.any(String),
    })
  })

  test('Devuelve una lista de horarios disponibles en una fecha determinada', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fecha: '2022-05-26',
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({
      horarioDia: ['11:00', '12:20', '13:40'],
    })
  })
})
