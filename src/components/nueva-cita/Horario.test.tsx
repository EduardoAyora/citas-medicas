import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import HorarioDia from './Horario'

describe('HorarioDia', () => {
  test('Muestra un listado con la disponibilidad de horario', async () => {
    const availableHours: string[] = ['10:40', '11:00', '11:40', '12:20']
    const setHour = jest.fn()
    render(
      <HorarioDia
        selectedDate={new Date()}
        setSelectedDate={() => {}}
        isAvailableHoursLoading={false}
        setIsAvailableHoursLoading={() => {}}
        availableHours={availableHours}
        setHour={setHour}
      />
    )

    const hourButton = screen.getByRole('button', { name: '10:40' })
    screen.getByRole('button', { name: '11:00' })
    screen.getByRole('button', { name: '11:40' })
    screen.getByRole('button', { name: '12:20' })

    await userEvent.click(hourButton)
    expect(setHour).toHaveBeenCalledTimes(1)
  })
})
