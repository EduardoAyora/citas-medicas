import { SEXO } from '@prisma/client'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import nock from 'nock'
import NuevaCita from './NuevaCita'

const patient = {
  nombre: 'Eduardo',
  apellido: 'Ayora',
  cedula: '0104236571',
  direccion: 'Calle falsa 123',
  celular: '0982634321',
  email: 'eduardo@gmail.com',
  sexo: SEXO.MASCULINO,
}
const servicio = {
  id: 1,
  descripcion: 'Consulta general',
  usuario: { name: 'Eduardo' },
}

const host = process.env.HOST || ''

describe('NuevaCita', () => {
  nock(host)
    .get('/api/servicios')
    .reply(200, JSON.stringify({ servicios: [servicio] }))
  nock(host)
    .get(/\/api\/servicios\/1\/horario-disponible\/.*/)
    .reply(
      200,
      JSON.stringify({
        horarioDisponible: ['10:40', '11:00', '11:40', '12:20'],
      })
    )
  nock(host)
    .get(`/api/personas/${patient.cedula}`)
    .reply(200, JSON.stringify(patient))
  nock(host).post(`/api/servicios/1/citas`).reply(200, JSON.stringify({}))

  test('Seleccionar el horario y agendar cita para el paciente', async () => {
    render(<NuevaCita />)

    const serviceButton = await screen.findByRole('button', {
      name: `${servicio.descripcion}-${servicio.usuario.name}`,
    })
    await userEvent.click(serviceButton)
    const hourButton = await screen.findByRole('button', { name: '11:00' })

    await userEvent.click(hourButton)

    const searchBox = screen.getByLabelText('Busque un paciente')
    const searchButton = screen.getByRole('button', { name: 'Buscar' })

    await userEvent.type(searchBox, patient.cedula)
    await userEvent.click(searchButton)

    await screen.findByText(`${patient.nombre} ${patient.apellido}`)
    await userEvent.click(screen.getByRole('button', { name: 'Agendar' }))
    await screen.findByText('Se ha agendado la cita')
  })

  nock(host)
    .get('/api/servicios')
    .reply(200, JSON.stringify({ servicios: [servicio] }))
  nock(host)
    .get(/\/api\/servicios\/1\/horario-disponible\/.*/)
    .reply(
      200,
      JSON.stringify({
        horarioDisponible: ['10:40', '11:00', '11:40', '12:20'],
      })
    )
  nock(host)
    .post(
      `/api/pacientes`,
      (body) =>
        body.cedula === patient.cedula &&
        body.nombre === patient.nombre &&
        body.apellido === patient.apellido &&
        body.direccion === patient.direccion &&
        body.celular === patient.celular &&
        body.email === patient.email &&
        body.sexo === patient.sexo
    )
    .reply(200, JSON.stringify({ pacienteCreado: patient }))

  test('Crear un paciente', async () => {
    render(<NuevaCita />)
    const serviceButton = await screen.findByRole('button', {
      name: `${servicio.descripcion}-${servicio.usuario.name}`,
    })
    await userEvent.click(serviceButton)
    const hourButton = await screen.findByRole('button', { name: '11:00' })

    await userEvent.click(hourButton)

    const scheduleButton = screen.getByRole('button', { name: 'Agendar' })
    const createButton = screen.getByRole('button', {
      name: '+ Crear Paciente',
    })

    expect(scheduleButton).toBeDisabled()

    await userEvent.click(createButton)
    await userEvent.type(screen.getByLabelText('Nombre'), patient.nombre)
    await userEvent.type(screen.getByLabelText('Apellido'), patient.apellido)
    await userEvent.type(screen.getByLabelText('Cédula'), patient.cedula)
    await userEvent.type(screen.getByLabelText('Dirección'), patient.direccion)
    await userEvent.type(screen.getByLabelText('Celular'), patient.celular)
    await userEvent.type(screen.getByLabelText('Email'), patient.email)
    await userEvent.click(
      screen.getByRole('button', { name: 'Crear Paciente' })
    )

    const btnCloseModal = await screen.findByRole('button', { name: 'Cerrar' })
    await userEvent.click(btnCloseModal)

    await screen.findByText(`${patient.nombre} ${patient.apellido}`)
    expect(scheduleButton).toBeEnabled()
  })
})
