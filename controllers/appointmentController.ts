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
    const fractionOfHour = (currentTime % 1).toFixed(1)
    if (fractionOfHour == '0.0') {
      times.push(`${currentTime}:00`)
    } else {
      times.push(
        `${Math.trunc(currentTime)}:${parseFloat(fractionOfHour) * 60}`
      )
    }
  }
  return times
}
