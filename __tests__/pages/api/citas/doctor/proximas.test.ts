import { Rol } from "@prisma/client";
import { createMocks } from "node-mocks-http";
import handler from "../../../../../pages/api/citas/doctor/proximas";
import { prisma } from "../../../../../src/lib/db";

jest.mock('next-auth/react', () => ({
  __esModule: true,
  getSession: async () => ({
    user: { name: 'ed', role: Rol.DOCTOR, username: 'ed', id: 1 },
  }),
}))

jest
  .useFakeTimers()
  .setSystemTime(new Date('2020-01-01'));

describe("pages/api/citas/doctor/proximas", () => {
  beforeAll(async () => {
    await prisma.admin.create({
      data: {
        email: 'admin@gmail.com',
        password: 'admin',
        id: 1
      }
    })
    await prisma.persona.createMany({
      data: [{
        id: 1,
        adminId: 1,
        nombre: "Test",
        apellido: "Test",
        email: "a",
        cedula: "1",
        celular: "",
        direccion: "",
      },
      {
        id: 2,
        adminId: 1,
        nombre: "Test2",
        apellido: "Test2",
        email: "e",
        cedula: "2",
        celular: "",
        direccion: "",
      }]
    })
    await prisma.usuario.createMany({
      data: [{
        id: 1,
        personaId: 1,
        role: Rol.DOCTOR,
        name: "Test",
        password: "",
        username: "a",
      },{
        id: 2,
        personaId: 2,
        role: Rol.DOCTOR,
        name: "Test2",
        password: "",
        username: "e",
      }]})
    await prisma.servicio.createMany({
      data: [{
        id: 3,
        usuarioId: 1,
        costo: 0,
        descripcion: "",
        duracionEnMinutos: 0,
      },
      {
        id: 2,
        usuarioId: 2,
        costo: 0,
        descripcion: "",
        duracionEnMinutos: 0,
      }]})
    await prisma.cita.createMany({
      data: [
        {
          day: "2020-01-10",
          time: "08:00",
          durationInMinutes: 60,
          servicioId: 3,
          pacienteId: 1,
        },
        {
          day: "2020-01-10",
          time: "09:00",
          durationInMinutes: 60,
          servicioId: 3,
          pacienteId: 1,
        },
        {
          day: "2020-01-05",
          time: "10:00",
          durationInMinutes: 60,
          servicioId: 2,
          pacienteId: 2,
        },
      ]
    })
  })
  afterAll(async () => { 
    await prisma.cita.deleteMany()
    await prisma.servicio.deleteMany()
    await prisma.usuario.deleteMany()
    await prisma.persona.deleteMany()
    await prisma.admin.deleteMany()
  })
  it("Lista solo las citas del doctor con id 1", async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })
    await handler(req, res)
    expect(res._getStatusCode()).toBe(200)
    expect(res._getJSONData()).toEqual({
      citas: [
        {
          id: expect.any(Number),
          day: "2020-01-10",
          time: "08:00",
          durationInMinutes: 60,
          doctor: 'Test',
          paciente: `Test Test`
        },
        {
          id: expect.any(Number),
          day: "2020-01-10",
          time: "09:00",
          durationInMinutes: 60,
          doctor: 'Test',
          paciente: `Test Test`
        },
      ]
    })
  })
})