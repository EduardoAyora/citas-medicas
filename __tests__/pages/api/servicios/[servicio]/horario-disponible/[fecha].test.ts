import { createMocks } from 'node-mocks-http'
import { Dia } from '@prisma/client'

import handler from '../../../../../../pages/api/servicios/[servicio]/horario-disponible/[fecha]'
import { prisma } from '../../../../../../src/lib/db'

describe('handler /servicios/[servicio]/horario-disponible/[fecha]', () => {
  beforeAll(async () => {
    await prisma.admin.create({
      data: {
        email: 'admin@gmail.com',
        password: 'admin',
        id: 1
      }
    })

    await prisma.persona.create({
      data: {
        id: 1,
        adminId: 1,
        cedula: '1234567890',
        nombre: 'karen',
        apellido: 'ayora',
        email: 'kar@gmail.com',
        celular: '1234567890',
        direccion: 'calle falsa 123',
      }
    })

    await prisma.usuario.create({
      data: {
        id: 1,
        name: 'Doctor',
        password: '123456',
        username: 'doctor',
        personaId: 1
      }
    })
    await prisma.servicio.createMany({
      data: [
        {
          id: 1,
          costo: 15,
          descripcion: 'Medicina General',
          duracionEnMinutos: 20,
          usuarioId: 1,
        },
        {
          id: 2,
          costo: 25,
          descripcion: 'Medicina General 2',
          duracionEnMinutos: 60,
          usuarioId: 1,
        },
      ],
    })

    await prisma.horarioDia.createMany({
      data: [
        { dia: Dia.JUEVES, horaInicio: 11, horaFin: 14, servicioId: 1 },
        { dia: Dia.VIERNES, horaInicio: 11, horaFin: 13, servicioId: 1 },
        { dia: Dia.VIERNES, horaInicio: 11, horaFin: 15, servicioId: 2 },
      ],
    })

    await prisma.cita.createMany({
      data: [
        {
          time: '11:30',
          durationInMinutes: 45,
          day: '2022-05-26',
          servicioId: 1,
          pacienteId: 1,
        },
        {
          time: '12:40',
          durationInMinutes: 45,
          day: '2022-05-26',
          servicioId: 1,
          pacienteId: 1,
        },
        {
          time: '11:20',
          durationInMinutes: 20,
          day: '2022-05-27',
          servicioId: 1,
          pacienteId: 1,
        },
        {
          time: '12:00',
          durationInMinutes: 20,
          day: '2022-05-27',
          servicioId: 1,
          pacienteId: 1,
        },
        {
          time: '12:40',
          durationInMinutes: 20,
          day: '2022-05-27',
          servicioId: 1,
          pacienteId: 1,
        },
        {
          time: '12:30',
          durationInMinutes: 20,
          day: '2022-05-27',
          servicioId: 2,
          pacienteId: 1,
        },
      ],
    })
  })

  afterAll(async () => {
    await prisma.cita.deleteMany()
    await prisma.horarioDia.deleteMany()
    await prisma.servicio.deleteMany()
    await prisma.usuario.deleteMany()
    await prisma.persona.deleteMany()
    await prisma.admin.deleteMany()
  })

  test('Devuelve un estado de error al no recibir una fecha', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
    expect(res._getJSONData()).toEqual({
      message: expect.any(String),
    })
  })

  test('Devuelve un estado de error al no recibir una fecha válida', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fecha: 'a',
      },
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
    expect(res._getJSONData()).toEqual({
      message: expect.any(String),
    })
  })

  test('Devuelve un estado de error al no encontrar el servicio', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fecha: '2022-05-26',
        servicio: 20,
      },
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(404)
    expect(res._getJSONData()).toEqual({
      message: expect.any(String),
    })
  })

  test('Devuelve una lista de horarios disponibles en un servicio en una fecha determinada', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fecha: '2022-05-26',
        servicio: 1,
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({
      horarioDisponible: ['11:00', '12:20', '13:40'],
    })
  })

  test('Devuelve una lista de horarios disponibles en un servicio en una fecha determinada', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fecha: '2022-05-27',
        servicio: 1,
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({
      horarioDisponible: ['11:00', '11:40', '12:20'],
    })
  })

  test('Devuelve una lista de horarios disponibles en un servicio en una fecha determinada', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fecha: '2022-05-27',
        servicio: 2,
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({
      horarioDisponible: ['11:00', '13:00', '14:00'],
    })
  })

  test('Devuelve una lista de horarios vacía cuando se pasa un día en el que un servicio no está disponible', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        fecha: '2022-05-30',
        servicio: 2,
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({
      horarioDisponible: [],
    })
  })
})
