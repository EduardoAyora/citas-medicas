import { getAvailableTimesToSchedule } from './appointmentController'

describe('getAvailableTimesToSchedule', () => {
  test('Devuelve una lista de horarios entre las 8:00 y las 11:00 con duración de 30 minutos', () => {
    expect(
      getAvailableTimesToSchedule({
        startTime: 8,
        endTime: 11,
        singleAppointmentDuration: 30,
      })
    ).toEqual(['8:00', '8:30', '9:00', '9:30', '10:00', '10:30'])
  })

  test('Devuelve una lista de horarios entre las 11:00 y las 13:00 con duración de 20 minutos', () => {
    expect(
      getAvailableTimesToSchedule({
        startTime: 11,
        endTime: 13,
        singleAppointmentDuration: 20,
      })
    ).toEqual(['11:00', '11:20', '11:40', '12:00', '12:20', '12:40'])
  })
})
