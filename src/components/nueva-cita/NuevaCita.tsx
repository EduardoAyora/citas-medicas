import Paciente from './Paciente'
import Horario from './Horario'
import { useEffect, useState } from 'react'

import Exito from './Exito'
import Servicios, { ServicioJSON } from './Servicios'
import { Persona } from '@prisma/client'

const NuevaCita: React.FC = () => {
  const [service, setService] = useState<ServicioJSON>()
  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState(
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    )
  )
  const [availableHours, setAvailableHours] = useState<string[]>([])
  const [isAvailableHoursLoading, setIsAvailableHoursLoading] = useState(true)
  const [selectedHour, setSelectedHour] = useState<string>()
  const [patient, setPatient] = useState<Persona>()
  const [isNewAppointmentCreated, setIsNewAppointmentCreated] =
    useState<boolean>(false)

  useEffect(() => {
    const fetchDaySchedule = async (date: Date) => {
      if (!service) return
      const formattedDate = date.toISOString().split('T')[0]
      setIsAvailableHoursLoading(true)
      const availableHoursData = await fetch(
        `/api/servicios/${service.id}/horario-disponible/${formattedDate}`
      )
      const availableHours = await availableHoursData.json()
      setIsAvailableHoursLoading(false)
      if (!availableHoursData.ok) return alert(availableHours.message)
      const { horarioDisponible } = availableHours
      setAvailableHours(horarioDisponible)
    }
    fetchDaySchedule(selectedDate)
  }, [selectedDate, service])

  const onScheduleClick = async () => {
    if (!service) return
    if (!patient) return
    const formattedDate = selectedDate.toISOString().split('T')[0]
    const citaData = await fetch(`/api/servicios/${service.id}/citas`, {
      method: 'POST',
      body: JSON.stringify({
        day: formattedDate,
        time: selectedHour,
        pacienteId: patient.cedula,
      }),
    })
    const cita = await citaData.json()
    if (!citaData.ok) return alert(cita.message)
    setIsNewAppointmentCreated(true)
  }

  if (!service) return <Servicios setService={setService} />

  if (!availableHours) return <>Cargando...</>

  if (isNewAppointmentCreated)
    return (
      <Exito
        onGoBack={() => {
          setIsNewAppointmentCreated(false)
          setSelectedHour(undefined)
          setSelectedDate(new Date())
          setService(undefined)
        }}
      />
    )

  return (
    <div>
      {!selectedHour && (
        <Horario
          onGoBack={() => setService(undefined)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          isAvailableHoursLoading={isAvailableHoursLoading}
          setIsAvailableHoursLoading={setIsAvailableHoursLoading}
          availableHours={availableHours}
          setHour={setSelectedHour}
        />
      )}
      {selectedHour && (
        <Paciente
          patient={patient}
          setPatient={setPatient}
          onGoBack={() => setSelectedHour(undefined)}
          selectedDate={selectedDate}
          selectedHour={selectedHour}
          servicio={service}
          onScheduleClick={onScheduleClick}
        />
      )}
    </div>
  )
}

export default NuevaCita
