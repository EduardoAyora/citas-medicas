import { Cita, Dia } from '@prisma/client'

export const getAvailableTimesToSchedule = ({
  startTime,
  endTime,
  newAppointmentDuration,
  appointments,
}: {
  startTime: number
  endTime: number
  newAppointmentDuration: number
  appointments: Cita[]
}): string[] => {
  const times = getTimesToSchedule({
    startTime,
    endTime,
    newAppointmentDuration,
  })

  const timesNotCollisioningWithAppointments = times.filter((time) =>
    isTimeAvailable({
      appointments,
      newAppointmentDuration,
      time,
    })
  )
  return timesNotCollisioningWithAppointments
}

export const getTimesToSchedule = ({
  startTime,
  endTime,
  newAppointmentDuration,
}: {
  startTime: number
  endTime: number
  newAppointmentDuration: number
}): string[] => {
  const times = []
  for (
    let currentTimeInHours = startTime;
    currentTimeInHours < endTime;
    currentTimeInHours += newAppointmentDuration / 60
  ) {
    const formattedMinutes =
      getFormattedMinutesFromTimeInHours(currentTimeInHours)
    const formattedHour = getFormattedHourFromTimeInHours(currentTimeInHours)

    times.push(`${formattedHour}:${formattedMinutes}`)
  }
  return times
}

export const getFormattedHourFromTimeInHours = (
  timeInHours: number
): string => {
  const hour = Math.trunc(timeInHours) + ''
  const formattedHour = hour.length === 1 ? `0${hour}` : hour
  return formattedHour
}

export const getFormattedMinutesFromTimeInHours = (
  timeInHours: number
): string => {
  const fractionOfHour = timeInHours % 1
  const minutes = Math.round(fractionOfHour * 60) + ''
  const formattedMinutes = minutes.length === 1 ? `0${minutes}` : minutes
  return formattedMinutes
}

export const getMinutesFromFormattedHour = (formattedHour: string): number => {
  const [hour, minute] = formattedHour.split(':')
  return parseInt(hour) * 60 + parseInt(minute)
}

export const isTimeAvailable = ({
  appointments,
  time,
  newAppointmentDuration,
}: {
  appointments: Cita[]
  time: string
  newAppointmentDuration: number
}): boolean => {
  const timeInScheduleInMinutes = getMinutesFromFormattedHour(time)
  const isTimeAlreadyScheduled = appointments.some((appointment) => {
    const timeOfAppointment = appointment.time
    const durationInMinutesOfAppointment = appointment.durationInMinutes
    const appointmentTimeInMinutesStart =
      getMinutesFromFormattedHour(timeOfAppointment)
    const appointmentTimeInMinutesEnd =
      appointmentTimeInMinutesStart + durationInMinutesOfAppointment

    const isTimeAlreadyScheduled = isRangeOfNumbersCollisioningWithAnother({
      smallestValueInFirstRange: timeInScheduleInMinutes,
      highestValueInFirstRange:
        timeInScheduleInMinutes + newAppointmentDuration,
      smallestValueInSecondRange: appointmentTimeInMinutesStart,
      highestValueInSecondRange: appointmentTimeInMinutesEnd,
    })

    return isTimeAlreadyScheduled
  })
  return !isTimeAlreadyScheduled
}

export const isRangeOfNumbersCollisioningWithAnother = ({
  smallestValueInFirstRange,
  highestValueInFirstRange,
  smallestValueInSecondRange,
  highestValueInSecondRange,
}: {
  smallestValueInFirstRange: number
  highestValueInFirstRange: number
  smallestValueInSecondRange: number
  highestValueInSecondRange: number
}): boolean => {
  const lastValueToAddToSmallestValueInFirstRange =
    highestValueInFirstRange - smallestValueInFirstRange
  const isFirstRangeOfNumbersWithinSecondRange = Array.from(
    Array(lastValueToAddToSmallestValueInFirstRange).keys()
  ).reduce((prev, addedMinute) => {
    return (
      prev ||
      (smallestValueInFirstRange + addedMinute >= smallestValueInSecondRange &&
        smallestValueInFirstRange + addedMinute < highestValueInSecondRange)
    )
  }, false)
  return isFirstRangeOfNumbersWithinSecondRange
}

export const getDayOfWeekFromDate = (dateString: string): Dia | undefined => {
  const date = new Date(dateString)
  switch (date.getDay()) {
  case 0:
    return Dia.LUNES
  case 1:
    return Dia.MARTES
  case 2:
    return Dia.MIERCOLES
  case 3:
    return Dia.JUEVES
  case 4:
    return Dia.VIERNES
  case 5:
    return Dia.SABADO
  case 6:
    return Dia.DOMINGO
  }
}
