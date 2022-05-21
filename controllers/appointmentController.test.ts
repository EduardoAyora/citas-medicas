import { getAvailableTimesToSchedule } from './appointmentController'

describe('getAvailableTimesToSchedule', () => {
  test('Devuelve una lista de horarios entre las 8:00 y las 11:00 con duración de 30 minutos', () => {
    expect(
      getAvailableTimesToSchedule({
        startTime: 8,
        endTime: 11,
        singleAppointmentDuration: 30,
        appointmentsAlreadyScheduled: [],
      })
    ).toEqual(['8:00', '8:30', '9:00', '9:30', '10:00', '10:30'])
  })

  test('Devuelve una lista de horarios entre las 11:00 y las 13:00 con duración de 20 minutos', () => {
    expect(
      getAvailableTimesToSchedule({
        startTime: 11,
        endTime: 13,
        singleAppointmentDuration: 20,
        appointmentsAlreadyScheduled: [],
      })
    ).toEqual(['11:00', '11:20', '11:40', '12:00', '12:20', '12:40'])
  })

  test('Devuelve una lista de horarios y excluye horarios en los que ya hay citas agendadas, la duración de las citas nuevas y las ya agendadas es la misma', () => {
    expect(
      getAvailableTimesToSchedule({
        startTime: 11,
        endTime: 13,
        singleAppointmentDuration: 20,
        appointmentsAlreadyScheduled: [
          { time: '11:20', durationInMinutes: 20 },
          { time: '12:00', durationInMinutes: 20 },
          { time: '12:40', durationInMinutes: 20 },
        ],
      })
    ).toEqual(['11:00', '11:40', '12:20'])
  })
})
