import Paciente from './Paciente'
import Horario from './Horario'
import { useEffect, useState } from 'react'

import Exito from './Exito'

const NuevaCita: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [availableHours, setAvailableHours] = useState<string[]>([])
  const [isAvailableHoursLoading, setIsAvailableHoursLoading] = useState(true)
  const [selectedHour, setSelectedHour] = useState<string>()
  const [isNewAppointmentCreated, setIsNewAppointmentCreated] =
    useState<boolean>(false)

  useEffect(() => {
    fetchDaySchedule(selectedDate)
  }, [selectedDate])

  const fetchDaySchedule = async (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0]
    setIsAvailableHoursLoading(true)
    const availableHoursData = await fetch(
      `/api/servicio/1/horario-disponible/${formattedDate}`
    )
    const availableHours = await availableHoursData.json()
    setIsAvailableHoursLoading(false)
    if (!availableHoursData.ok) return alert(availableHours.message)
    const { horarioDisponible } = availableHours
    setAvailableHours(horarioDisponible)
  }

  const onScheduleClick = async () => {
    const citaData = await fetch(`/api/servicio/1/citas`, {
      method: 'POST',
      body: JSON.stringify({
        day: '2022-05-26',
        time: selectedHour,
      }),
    })
    const cita = await citaData.json()
    if (!citaData.ok) return alert(cita.message)
    setIsNewAppointmentCreated(true)
  }

  if (!availableHours) return <>Cargando...</>

  if (isNewAppointmentCreated) return <Exito />

  return (
    <div>
      {!selectedHour && (
        <Horario
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          isAvailableHoursLoading={isAvailableHoursLoading}
          setIsAvailableHoursLoading={setIsAvailableHoursLoading}
          availableHours={availableHours}
          setHour={setSelectedHour}
        />
      )}
      {selectedHour && <Paciente onScheduleClick={onScheduleClick} />}
    </div>
  )
}

export default NuevaCita
