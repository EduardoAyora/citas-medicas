import { createMocks } from 'node-mocks-http'
import { Dia } from '@prisma/client'

import handler from '../../../../../../pages/api/servicios/[servicio]/horario-disponible/[fecha]'
import { prisma } from '../../../../../../src/lib/db'

describe('handler /servicios/[servicio]/horario-disponible/[fecha]', () => {
  beforeAll(async () => {
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
        { dia: Dia.JUEVES, horaInicio: 11, horaFin: 14, servicioId: 1 },
        { dia: Dia.VIERNES, horaInicio: 11, horaFin: 13, servicioId: 1 },
        { dia: Dia.VIERNES, horaInicio: 11, horaFin: 15, servicioId: 2 },
      ],
    })

    await prisma.persona.create({
      data: {
        cedula: '1234567890',
        nombre: 'eduardo',
        apellido: 'sanchez',
        email: 'kar@gmail.com',
        celular: '1234567890',
        direccion: 'calle falsa 123',
      }})

    await prisma.cita.createMany({
      data: [
        {
          time: '11:30',
          durationInMinutes: 45,
          day: '2022-05-26',
          servicioId: 1,
          pacienteId:'1234567890',
        },
        {
          time: '12:40',
          durationInMinutes: 45,
          day: '2022-05-26',
          servicioId: 1,
          pacienteId:'1234567890',
        },
        {
          time: '11:20',
          durationInMinutes: 20,
          day: '2022-05-27',
          servicioId: 1,
          pacienteId:'1234567890',
        },
        {
          time: '12:00',
          durationInMinutes: 20,
          day: '2022-05-27',
          servicioId: 1,
          pacienteId:'1234567890',
        },
        {
          time: '12:40',
          durationInMinutes: 20,
          day: '2022-05-27',
          servicioId: 1,
          pacienteId:'1234567890',
        },
        {
          time: '12:30',
          durationInMinutes: 20,
          day: '2022-05-27',
          servicioId: 2,
          pacienteId:'1234567890',
        },
      ],
    })
  })

  afterAll(async () => {
    await prisma.cita.deleteMany()
    await prisma.horarioDia.deleteMany()
    await prisma.servicio.deleteMany()
    await prisma.persona.deleteMany()
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
