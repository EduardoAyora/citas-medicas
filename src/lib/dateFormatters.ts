export const getFormattedDateString = (date: Date) => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' } as const
  const dateString = date.toLocaleDateString('es-ES', options)
  const dateStringCapilized =
    dateString.charAt(0).toUpperCase() + dateString.slice(1)
  return dateStringCapilized
}