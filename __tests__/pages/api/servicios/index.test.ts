import { Rol } from '@prisma/client'
import { createMocks } from 'node-mocks-http'
import handler from '../../../../pages/api/servicios/index'

import {prisma} from '../../../../src/lib/db'

describe('ruta /api/servicios/index método GET', () => {
  beforeAll(async () => {
    await prisma.usuario.create({
      data: {
        id: 1,
        name: 'Eduardo',
        password: '123',
        username: 'edu',
        role: Rol.DOCTOR,
      },
    })
    await prisma.servicio.createMany(
      {
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
          }
        ]
      }
    )
  })
  afterAll(async () => {
    await prisma.servicio.deleteMany({})
    await prisma.usuario.deleteMany({})
  })

  test('Consultar todos los servicios', async () => {
    const { req, res } = createMocks({
      method: 'GET'
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual(
      {
        servicios: [
          {
            costo: "15",
            descripcion: 'Medicina General',
            duracionEnMinutos: 20,
            id: 1,
            usuario: {
              name: 'Eduardo',
            }
          },
          {
            costo: "25",
            descripcion: 'Medicina General 2',
            duracionEnMinutos: 60,
            id: 2,
            usuario: {
              name: 'Eduardo',
            }
          },
        ]
      }
    )
  })
})