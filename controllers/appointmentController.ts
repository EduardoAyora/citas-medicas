export const getAvailableTimesToSchedule = ({
  startTime,
  endTime,
  singleAppointmentDuration,
}: {
  startTime: number
  endTime: number
  singleAppointmentDuration: number
}): string[] => {
  const times = []
  for (
    let currentTime = startTime;
    currentTime < endTime;
    currentTime += singleAppointmentDuration / 60
  ) {
    const fractionOfHour = currentTime % 1
    const minutes = Math.trunc(fractionOfHour * 60) + ''
    const formattedMinutes = minutes.length === 1 ? `0${minutes}` : minutes

    times.push(`${Math.trunc(currentTime)}:${formattedMinutes}`)
  }
  return times
}
