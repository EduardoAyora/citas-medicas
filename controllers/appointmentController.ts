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

    times.push(`${Math.trunc(currentTimeInHours)}:${formattedMinutes}`)
  }
  return times
}

export const getFormattedMinutesFromTimeInHours = (
  timeInHours: number
): string => {
  const fractionOfHour = timeInHours % 1
  const minutes = Math.trunc(fractionOfHour * 60) + ''
  const formattedMinutes = minutes.length === 1 ? `0${minutes}` : minutes
  return formattedMinutes
}
