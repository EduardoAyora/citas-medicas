import userEvent from '@testing-library/user-event'
import { queryByText, render, screen, waitFor } from '@testing-library/react'
import nock from 'nock'
import VerCitas from './VerCitas'

const citas = [
  {
    id: 1,
    day: '2022-07-06',
    durationInMinutes: 60,
    time: '12:00',
    doctor: 'Eduardo Ayora',
    paciente: 'Juan Perez',
  },
  {
    id: 2,
    day: '2022-07-07',
    durationInMinutes: 20,
    time: '13:00',
    doctor: 'Karen Ayora',
    paciente: 'René Perez',
  },
]

const citaCancelada = {
  id: 3,
  day: '2022-07-08',
  durationInMinutes: 20,
  time: '14:00',
  doctor: 'John Ayora',
  paciente: 'Eduardo Ochoa',
}

const host = process.env.HOST || ''
nock(host).get('/api/citas/proximas').reply(200, JSON.stringify({ citas }))
nock(host).get('/api/citas/pasadas').reply(200, JSON.stringify({ citas }))
nock(host)
  .get('/api/citas/canceladas')
  .reply(200, JSON.stringify({ citas: [citaCancelada] }))

describe('VerCitas', () => {
  test('Muestra las citas próximas, pasadas y canceladas', async () => {
    render(<VerCitas />)

    await screen.findAllByText('Miércoles, 6 de julio')
    screen.getAllByText('Jueves, 7 de julio')
    screen.getAllByText('12:00')
    screen.getAllByText('13:00')
    screen.getByText(
      'Cita de 60 minutos del paciente Juan Perez con el doctor/a Eduardo Ayora'
    )
    screen.getByText(
      'Cita de 20 minutos del paciente René Perez con el doctor/a Karen Ayora'
    )

    await userEvent.click(screen.getByRole('button', { name: 'Canceladas' }))
    await screen.findAllByText('Viernes, 8 de julio')
    screen.getAllByText('14:00')
    screen.getByText(
      'Cita de 20 minutos del paciente Eduardo Ochoa con el doctor/a John Ayora'
    )

    await userEvent.click(screen.getByRole('button', { name: 'Pasadas' }))
    await screen.findAllByText('Jueves, 7 de julio')
    screen.getAllByText('13:00')
    screen.getByText(
      'Cita de 20 minutos del paciente René Perez con el doctor/a Karen Ayora'
    )
  })

  nock(host).get('/api/citas/proximas').reply(200, JSON.stringify({ citas }))
  nock(host)
    .put('/api/citas/1/cancelar')
    .reply(200, JSON.stringify({ message: 'Se ha cancelado la cita' }))

  test('Cancelar citas', async () => {
    render(<VerCitas />)

    await screen.findAllByText('Miércoles, 6 de julio')
    screen.getAllByText('12:00')
    await userEvent.click(screen.getByRole('button', { name: 'cancelar-0' }))

    await waitFor(() => {
      expect(
        screen.queryByText('Miércoles, 6 de julio')
      ).not.toBeInTheDocument()
      expect(screen.queryByText('12:00')).not.toBeInTheDocument()
    })
  })
})
