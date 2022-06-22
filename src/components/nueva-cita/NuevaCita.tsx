import Paciente from './Paciente'
import Horario from './Horario'
import { useEffect, useState } from 'react'

const NuevaCita: React.FC = () => {
  const [availableHours, setAvailableHours] = useState<string[]>([])
  const [selectedHour, setSelectedHour] = useState<string>()
  const [isNewAppointmentCreated, setIsNewAppointmentCreated] =
    useState<boolean>(false)

  useEffect(() => {
    const fetchInitialData = async () => {
      const availableHoursData = await fetch(
        '/api/servicio/1/horario-disponible/2022-01-01'
      )
      if (!availableHoursData.ok) return
      const availableHours = await availableHoursData.json()
      setAvailableHours(availableHours)
    }
    fetchInitialData()
  }, [])

  const onScheduleClick = () => {
    setIsNewAppointmentCreated(true)
  }

  if (!availableHours) return <>Cargando...</>

  if (isNewAppointmentCreated) return <>Se ha agendado la cita</>

  return (
    <div>
      {!selectedHour && (
        <Horario availableHours={availableHours} setHour={setSelectedHour} />
      )}
      {selectedHour && <Paciente onScheduleClick={onScheduleClick} />}
    </div>
  )
}

export default NuevaCita
