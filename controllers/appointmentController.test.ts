import {
  getAvailableTimesToSchedule,
  getFormattedHourFromTimeInHours,
  getFormattedMinutesFromTimeInHours,
  getMinutesFromFormattedHour,
  getTimesToSchedule,
  isRangeOfNumbersCollisioningWithAnother,
  isTimeAvailable,
} from './appointmentController'

describe('getAvailableTimesToSchedule', () => {
  test('Devuelve una lista de horarios entre las 8:00 y las 11:00 con duración de 30 minutos', () => {
    expect(
      getAvailableTimesToSchedule({
        startTime: 8,
        endTime: 11,
        newAppointmentDuration: 30,
        appointments: [],
      })
    ).toEqual(['08:00', '08:30', '09:00', '09:30', '10:00', '10:30'])
  })

  test('Devuelve una lista de horarios y excluye horarios en los que ya hay citas agendadas, la duración de las citas nuevas y las ya agendadas es la misma', () => {
    expect(
      getAvailableTimesToSchedule({
        startTime: 11,
        endTime: 13,
        newAppointmentDuration: 20,
        appointments: [
          { time: '11:20', durationInMinutes: 20 },
          { time: '12:00', durationInMinutes: 20 },
          { time: '12:40', durationInMinutes: 20 },
        ],
      })
    ).toEqual(['11:00', '11:40', '12:20'])
  })

  test('Devuelve una lista de horarios y excluye horarios en los que ya hay citas agendadas, la duración de las citas nuevas es de 20m y de las ya agendadas es de 45m', () => {
    expect(
      getAvailableTimesToSchedule({
        startTime: 11,
        endTime: 14,
        newAppointmentDuration: 20,
        appointments: [
          { time: '11:30', durationInMinutes: 45 },
          { time: '12:40', durationInMinutes: 45 },
        ],
      })
    ).toEqual(['11:00', '12:20', '13:40'])
  })
})

describe('getTimesToSchedule', () => {
  test('Devuelve una lista de horarios entre las 11:00 y las 13:00 con duración de 20 minutos', () => {
    expect(
      getTimesToSchedule({
        startTime: 11,
        endTime: 13,
        newAppointmentDuration: 20,
      })
    ).toEqual(['11:00', '11:20', '11:40', '12:00', '12:20', '12:40'])
  })

  test('Devuelve una lista de horarios entre las 13:00 y las 15:00 con duración de 45 minutos', () => {
    expect(
      getTimesToSchedule({
        startTime: 13,
        endTime: 15,
        newAppointmentDuration: 45,
      })
    ).toEqual(['13:00', '13:45', '14:30'])
  })

  test('Devuelve una lista de horarios entre las 13:00 y las 17:00 con duración de 1 hora y media', () => {
    expect(
      getTimesToSchedule({
        startTime: 13,
        endTime: 17,
        newAppointmentDuration: 90,
      })
    ).toEqual(['13:00', '14:30', '16:00'])
  })
})

describe('getFormattedHoursFromTimeInHours', () => {
  test('Devuelve un string con las horas formateadas', () => {
    expect(getFormattedHourFromTimeInHours(10)).toBe('10')
    expect(getFormattedHourFromTimeInHours(10.5)).toBe('10')
    expect(getFormattedHourFromTimeInHours(1 / 3)).toBe('00')
    expect(getFormattedHourFromTimeInHours(9)).toBe('09')
    expect(getFormattedHourFromTimeInHours(9.5)).toBe('09')
    expect(getFormattedHourFromTimeInHours(11 + 40 / 60)).toBe('11')
    expect(getFormattedHourFromTimeInHours(12.75)).toBe('12')
    expect(getFormattedHourFromTimeInHours(23.25)).toBe('23')
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

describe('getMinutesFromFormattedHour', () => {
  test('Devuelve el equivalente en minutos de la hora dada', () => {
    expect(getMinutesFromFormattedHour('09:00')).toBe(540)
    expect(getMinutesFromFormattedHour('11:20')).toBe(680)
    expect(getMinutesFromFormattedHour('21:45')).toBe(1305)
  })
})

describe('isTimeAvailable', () => {
  test('Devuelve si una horario ya ha sido agendado', () => {
    expect(
      isTimeAvailable({
        appointments: [{ durationInMinutes: 30, time: '10:20' }],
        newAppointmentDuration: 30,
        time: '10:00',
      })
    ).toBe(false)
    expect(
      isTimeAvailable({
        appointments: [
          { durationInMinutes: 90, time: '00:20' },
          { durationInMinutes: 60, time: '10:20' },
        ],
        newAppointmentDuration: 40,
        time: '13:00',
      })
    ).toBe(true)
    expect(
      isTimeAvailable({
        appointments: [
          { durationInMinutes: 90, time: '00:20' },
          { durationInMinutes: 10, time: '13:10' },
        ],
        newAppointmentDuration: 50,
        time: '13:00',
      })
    ).toBe(false)
  })
})

describe('isRangeOfNumbersCollisioningWithAnother', () => {
  test('Devuelve si un rango de números choca con otro rango', () => {
    expect(
      isRangeOfNumbersCollisioningWithAnother({
        smallestValueInFirstRange: 3,
        highestValueInFirstRange: 8,
        smallestValueInSecondRange: 6,
        highestValueInSecondRange: 10,
      })
    ).toBe(true)
    expect(
      isRangeOfNumbersCollisioningWithAnother({
        smallestValueInFirstRange: 5,
        highestValueInFirstRange: 9,
        smallestValueInSecondRange: 8,
        highestValueInSecondRange: 9,
      })
    ).toBe(true)
    expect(
      isRangeOfNumbersCollisioningWithAnother({
        smallestValueInFirstRange: 5,
        highestValueInFirstRange: 9,
        smallestValueInSecondRange: 11,
        highestValueInSecondRange: 12,
      })
    ).toBe(false)
    expect(
      isRangeOfNumbersCollisioningWithAnother({
        smallestValueInFirstRange: 5,
        highestValueInFirstRange: 9,
        smallestValueInSecondRange: 9,
        highestValueInSecondRange: 10,
      })
    ).toBe(false)
  })
})
