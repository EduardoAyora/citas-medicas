import {
  getAvailableTimesToSchedule,
  getFormattedMinutesFromTimeInHours,
} from './appointmentController'

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

  test('Devuelve una lista de horarios entre las 13:00 y las 15:00 con duración de 45 minutos', () => {
    expect(
      getAvailableTimesToSchedule({
        startTime: 13,
        endTime: 15,
        singleAppointmentDuration: 45,
        appointmentsAlreadyScheduled: [],
      })
    ).toEqual(['13:00', '13:45', '14:30'])
  })

  test('Devuelve una lista de horarios entre las 13:00 y las 17:00 con duración de 1 hora y media', () => {
    expect(
      getAvailableTimesToSchedule({
        startTime: 13,
        endTime: 17,
        singleAppointmentDuration: 90,
        appointmentsAlreadyScheduled: [],
      })
    ).toEqual(['13:00', '14:30', '16:00'])
  })

  test.skip('Devuelve una lista de horarios y excluye horarios en los que ya hay citas agendadas, la duración de las citas nuevas y las ya agendadas es la misma', () => {
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

describe('getFormattedMinutesFromTimeInHours', () => {
  test('Devuelve un string con los minutos formateados', () => {
    expect(getFormattedMinutesFromTimeInHours(10)).toBe('00')
    expect(getFormattedMinutesFromTimeInHours(10.5)).toBe('30')
    expect(getFormattedMinutesFromTimeInHours(1 / 3)).toBe('20')
    expect(getFormattedMinutesFromTimeInHours(11 + 40 / 60)).toBe('40')
    expect(getFormattedMinutesFromTimeInHours(11 + 10 / 60)).toBe('10')
    expect(getFormattedMinutesFromTimeInHours(12.75)).toBe('45')
    expect(getFormattedMinutesFromTimeInHours(23.25)).toBe('15')
  })
})
