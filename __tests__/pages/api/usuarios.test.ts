import { Rol } from '@prisma/client'
import { createMocks } from 'node-mocks-http'
import handler from '../../../pages/api/usuarios'

import {prisma} from '../../../src/lib/db'

describe('ruta /api/usuarios método POST', () => {
  afterEach(async () => {
    await prisma.usuario.deleteMany()
  })

  test('El usuario ya existía', async () => {
    await prisma.usuario.create({
      data: {
        username: "ivan4",
        password : "123",
        name: "Iván",
        role: Rol.DOCTOR
      }
    })
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        username: "ivan4",
        password : "123",
        name: "Iván",
        role: Rol.DOCTOR
      }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(400)
    expect(res._getJSONData()).toEqual(
      {
        message: expect.any(String)
      }
    )
  })

  test('Se crea el usuario', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        username: "ivan4",
        password : "123",
        name: "Iván",
        role: Rol.DOCTOR
      }
    })

    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual(
      {
        id: expect.any(Number),
        username: "ivan4",
        password: "123",
        name: "Iván",
        role: Rol.DOCTOR
      }
    )
  })
})