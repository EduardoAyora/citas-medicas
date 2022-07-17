import { Rol } from '@prisma/client'
import { useState, useRef } from 'react'
import MyCombobox from '../../../src/components/common/Combobox'
import Loading from '../../../src/components/common/Loading'
import SuccessErrorModal from '../../../src/components/common/SuccessErrorModal'
import PageLayout from '../../../src/components/layout/PageLayout'
import useSuccessError from '../../../src/hooks/modals/useSuccessError'

const Index = () => {
  const [isCreateLoading, setIsCreateLoading] = useState(false)
  const [role, setRole] = useState<{ text: string; value: Rol }>({
    text: 'Doctor',
    value: Rol.DOCTOR,
  })

  const {
    isModalOpen,
    isSuccessModal,
    modalMessage,
    setIsModalOpen,
    showModal,
  } = useSuccessError()

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const nombreRef = useRef<HTMLInputElement>(null)
  const apellidoRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const celularRef = useRef<HTMLInputElement>(null)
  const direccionRef = useRef<HTMLInputElement>(null)
  const cedulaRef = useRef<HTMLInputElement>(null)

  const crearUsuario = async () => {
    const username = usernameRef.current?.value
    const password = passwordRef.current?.value
    const nombre = nombreRef.current?.value
    const apellido = apellidoRef.current?.value
    const email = emailRef.current?.value
    const celular = celularRef.current?.value
    const direccion = direccionRef.current?.value
    const cedula = cedulaRef.current?.value

    if (
      !username ||
      !password ||
      !nombre ||
      !apellido ||
      !email ||
      !celular ||
      !direccion ||
      !cedula
    ) {
      return showModal({
        message: 'Todos los campos son obligatorios',
        isSuccess: false,
      })
    }

    setIsCreateLoading(true)
    const usuarioData = await fetch('/api/usuarios', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        nombre,
        apellido,
        email,
        cedula,
        celular,
        direccion,
        role: role.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setIsCreateLoading(false)
    const { message } = await usuarioData.json()
    if (!usuarioData.ok)
      return showModal({
        message,
        isSuccess: false,
      })
    showModal({
      message,
      isSuccess: true,
    })
  }

  const roleOpitons = [
    { text: 'Doctor', value: Rol.DOCTOR },
    { text: 'Secretario', value: Rol.SECRETARY },
  ]

  return (
    <PageLayout
      pageTitle='Crear usuarios'
      pageDescription='Aquí puede crear usuarios doctores o secretarios'
    >
      <div>
        <SuccessErrorModal
          isOpen={isModalOpen}
          isSuccess={isSuccessModal}
          message={modalMessage}
          setIsOpen={setIsModalOpen}
        />
        <div className='pt-6 lg:pb-8 grid xl:grid-cols-2 gap-6'>
          <div>
            <label
              htmlFor='usuario'
              className='block text-sm font-medium text-gray-700'
            >
              Nombre de usuario:
            </label>
            <input
              ref={usernameRef}
              type='text'
              name='usuario'
              id='usuario'
              placeholder='Nombre de usuario'
              className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='contraseña'
              className='block text-sm font-medium text-gray-700'
            >
              Contraseña:
            </label>
            <input
              ref={passwordRef}
              type='text'
              name='contraseña'
              id='contraseña'
              placeholder='Contraseña'
              className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='nombre'
              className='block text-sm font-medium text-gray-700'
            >
              Nombre:
            </label>
            <input
              ref={nombreRef}
              type='text'
              name='nombre'
              id='nombre'
              placeholder='Nombre'
              className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='apellido'
              className='block text-sm font-medium text-gray-700'
            >
              Apellido:
            </label>
            <input
              ref={apellidoRef}
              type='text'
              name='apellido'
              id='apellido'
              placeholder='Apellido'
              className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='cedula'
              className='block text-sm font-medium text-gray-700'
            >
              Cédula:
            </label>
            <input
              ref={cedulaRef}
              type='text'
              name='cedula'
              id='cedula'
              placeholder='Cédula'
              className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='direccion'
              className='block text-sm font-medium text-gray-700'
            >
              Dirección:
            </label>
            <input
              ref={direccionRef}
              type='text'
              name='direccion'
              id='direccion'
              placeholder='Dirección'
              className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='celular'
              className='block text-sm font-medium text-gray-700'
            >
              Celular:
            </label>
            <input
              ref={celularRef}
              type='text'
              name='celular'
              id='celular'
              placeholder='Celular'
              className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email:
            </label>
            <input
              ref={emailRef}
              type='text'
              name='email'
              id='email'
              placeholder='Email'
              className='mt-1 block w-full rounded-sm border border-gray-300 px-3 py-2 focus:border-neutral-800 focus:outline-none focus:ring-neutral-800 sm:text-sm'
            />
          </div>
          <div>
            <label
              htmlFor='rol'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Rol:
            </label>
            <MyCombobox
              selected={role}
              options={roleOpitons}
              setSelected={(rol) => {
                const selectedOption = roleOpitons.find(
                  (option) => option.value === rol
                )
                if (!selectedOption) return
                setRole(selectedOption)
              }}
            />
          </div>
        </div>
        <div className='flex justify-end mt-4'>
          <button
            disabled={isCreateLoading}
            onClick={crearUsuario}
            className={`button flex justify-center items-center px-4 relative ${
              isCreateLoading && 'cursor-default'
            }`}
          >
            {isCreateLoading ? (
              <div className='mt-1 ml-1'>
                <Loading />
              </div>
            ) : (
              'Crear usuario'
            )}
          </button>
        </div>
      </div>
    </PageLayout>
  )
}

export default Index
