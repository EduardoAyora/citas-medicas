type appointment = {
  time: string
  durationInMinutes: number
}

export const getAvailableTimesToSchedule = ({
  startTime,
  endTime,
  singleAppointmentDuration,
  appointmentsAlreadyScheduled,
}: {
  startTime: number
  endTime: number
  singleAppointmentDuration: number
  appointmentsAlreadyScheduled: appointment[]
}): string[] => {
  const times = []
  for (
    let currentTimeInHours = startTime;
    currentTimeInHours < endTime;
    currentTimeInHours += singleAppointmentDuration / 60
  ) {
    const formattedMinutes =
      getFormattedMinutesFromTimeInHours(currentTimeInHours)
    const formattedHour = getFormattedHourFromTimeInHours(currentTimeInHours)

    times.push(`${formattedHour}:${formattedMinutes}`)
  }
  const timesWithoutAppointmentsAlreadyScheduled = times.filter(
    (timeInSchedule) => {
      const timeInScheduleInMinutes =
        getMinutesFromFormattedHour(timeInSchedule)
      const isTimeAlreadyScheduled = appointmentsAlreadyScheduled.some(
        (appointment) => {
          const { time, durationInMinutes } = appointment
          const appointmentTimeInMinutesStart =
            getMinutesFromFormattedHour(time)
          const appointmentTimeInMinutesEnd =
            appointmentTimeInMinutesStart + durationInMinutes

          const isTimeAlreadyScheduled = Array.from(
            Array(singleAppointmentDuration).keys()
          ).reduce((prev, addedMinute) => {
            return (
              prev ||
              (timeInScheduleInMinutes + addedMinute >=
                appointmentTimeInMinutesStart &&
                timeInScheduleInMinutes + addedMinute <
                  appointmentTimeInMinutesEnd)
            )
          }, false)

          return isTimeAlreadyScheduled
        }
      )
      return !isTimeAlreadyScheduled
    }
  )
  return timesWithoutAppointmentsAlreadyScheduled
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
