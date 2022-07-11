import { Rol } from '@prisma/client'
import { createMocks } from 'node-mocks-http'
import handler from '../../../pages/api/usuarios'

import {prisma} from '../../../src/lib/db'

describe('ruta /api/usuarios método POST', () => {
  afterEach(async () => {
    await prisma.usuario.deleteMany()
    await prisma.persona.deleteMany()
  })

  test('El usuario ya existía', async () => {
    await prisma.persona.create({
      data: {
        id: 1,
        nombre: 'Iván',
        apellido: 'Perez',
        email: 'ivan@gmail.com',
        cedula: '',
        celular: '',
        direccion: '',
      }
    })
    await prisma.usuario.create({
      data: {
        personaId: 1,
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
        role: Rol.DOCTOR,
        apellido: "Perez",
        cedula: "0105032221",
        direccion: "Calle falsa 123",
        celular: "123456789",
        email: "iv@gmail.com"
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
        role: Rol.DOCTOR,
        personaId: expect.any(Number),
      }
    )
  })
})