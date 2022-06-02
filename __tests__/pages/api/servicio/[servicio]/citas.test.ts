import { Dia, Rol } from '@prisma/client'

import handler from '../../../../../pages/api/servicio/[servicio]/citas'
import { prisma } from '../../../../../src/lib/db'
import { createMocks } from 'node-mocks-http'

let mockedRole: Rol = Rol.SECRETARY
jest.mock('next-auth/react', () => ({
  __esModule: true,
  getSession: async () => ({
    user: { name: 'karen', role: mockedRole, username: 'karen' },
  }),
}))

describe('handler /servicio/[servicio]/citas', () => {
  beforeAll(async () => {
    await prisma.usuario.createMany({
      data: [
        {
          name: 'Karen',
          password: '123',
          username: 'karen',
          role: Rol.SECRETARY,
        },
        {
          name: 'Eduardo',
          password: '123',
          username: 'eduardo',
        },
      ],
    })

    await prisma.servicio.createMany({
      data: [
        {
          id: 1,
          costo: 15,
          descripcion: 'Medicina General',
          duracionEnMinutos: 20,
        },
        {
          id: 2,
          costo: 25,
          descripcion: 'Medicina General 2',
          duracionEnMinutos: 60,
        },
      ],
    })

    await prisma.horarioDia.createMany({
      data: [
        { dia: Dia.JUEVES, horaInicio: 8, horaFin: 16, servicioId: 1 },
        { dia: Dia.VIERNES, horaInicio: 8, horaFin: 16, servicioId: 1 },
        { dia: Dia.VIERNES, horaInicio: 9, horaFin: 17, servicioId: 2 },
      ],
    })
  })
  beforeEach(() => {
    mockedRole = Rol.SECRETARY
  })
  afterEach(async () => {
    await prisma.cita.deleteMany()
  })
  afterAll(async () => {
    await prisma.horarioDia.deleteMany()
    await prisma.servicio.deleteMany()
    await prisma.usuario.deleteMany()
  })

  test('Devuelve que no se tiene los permisos necesarios', async () => {
    mockedRole = Rol.DOCTOR
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        servicio: 1,
      },
      body: {
        day: '2022-05-26',
        time: '11:30',
      },
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(403)
    expect(res._getJSONData()).toEqual({
      message: expect.any(String),
    })
  })

  test('Devuelve la cita guardada con éxito', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      query: {
        servicio: 1,
      },
      body: {
        day: '2022-05-26',
        time: '11:30',
      },
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({
      cita: {
        time: '11:30',
        durationInMinutes: 20,
        day: '2022-05-26',
        servicioId: 1,
        id: expect.any(Number),
      },
    })
  })
})
