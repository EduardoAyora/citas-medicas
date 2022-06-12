import { useState, useRef } from 'react'

export type Patient = {
  name: string
  id: string
}

const Paciente: React.FC = () => {
  const [isScheduleButtonEnabled, setIsScheduleButtonEnabled] =
    useState<boolean>(false)
  const [isCreatePatientEnabled, setIsCreatePatientEnabled] =
    useState<boolean>(false)
  const [patient, setPatient] = useState<Patient>()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const createPatientNameInputRef = useRef<HTMLInputElement>(null)
  const createPatientIdInputRef = useRef<HTMLInputElement>(null)

  const searchPatient = async () => {
    const id = searchInputRef.current?.value
    const patientData = await fetch(`/api/paciente/${id}`)
    if (!patientData.ok) return setIsScheduleButtonEnabled(false)
    const patient = await patientData.json()
    setPatient(patient)
    setIsScheduleButtonEnabled(true)
  }

  const createPatient = async () => {
    const id = createPatientIdInputRef.current?.value
    const name = createPatientNameInputRef.current?.value
    const patientData = await fetch(`/api/paciente`, {
      method: 'POST',
      body: JSON.stringify({ id, name }),
    })
    if (!patientData.ok) return setIsScheduleButtonEnabled(false)
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
        <div>
          <button type='button' onClick={() => setIsCreatePatientEnabled(true)}>
            Crear Paciente
          </button>
          {isCreatePatientEnabled && (
            <div>
              <label htmlFor='nombre_en_crear'>Nombre</label>
              <input
                ref={createPatientNameInputRef}
                id='nombre_en_crear'
                type='text'
              />
              <label htmlFor='cedula_en_crear'>Cédula</label>
              <input
                ref={createPatientIdInputRef}
                id='cedula_en_crear'
                type='text'
              />
              <button type='button' onClick={createPatient}>
                Crear
              </button>
            </div>
          )}
        </div>
        {patient && <p>{patient.name}</p>}
        <button disabled={!isScheduleButtonEnabled}>Agendar</button>
      </form>
    </div>
  )
}

export default Paciente
