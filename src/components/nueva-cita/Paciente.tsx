import { useState, useRef } from 'react'

export type Patient = {
  name: string
}

const Paciente: React.FC = () => {
  const [isScheduleButtonEnabled, setIsScheduleButtonEnabled] =
    useState<boolean>(false)
  const [patient, setPatient] = useState<Patient>()

  const searchInputRef = useRef<HTMLInputElement>(null)

  const searchPatient = async () => {
    const id = searchInputRef.current?.value
    const patientData = await fetch(`/api/paciente/${id}`)
    if (!patientData.ok) return
    const patient = await patientData.json()
    setPatient(patient)
    setIsScheduleButtonEnabled(true)
  }

  return (
    <div>
      <form>
        <div>
          <label htmlFor='busqueda_cedula'>Busque un paciente</label>
          <input ref={searchInputRef} id='busqueda_cedula' type='text' />
          <button type='button' onClick={searchPatient}>
            Buscar
          </button>
        </div>
        {patient && <p>{patient.name}</p>}
        <button disabled={!isScheduleButtonEnabled}>Agendar</button>
      </form>
    </div>
  )
}

export default Paciente
