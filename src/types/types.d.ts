interface CitaResponse {
  id: number
  day: string
  durationInMinutes: number
  time: string
  doctor: string
  paciente: string
}

interface PacienteResponse {
  sexo: string
  id: number
  nombre: string
  apellido: string
  cedula: string
  direccion: string
  celular: string
  email: string
}