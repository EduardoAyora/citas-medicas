import { useState } from 'react'

const useSuccessError = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>('')
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false)

  const showModal = ({
    message,
    isSuccess,
  }: {
    message: string
    isSuccess: boolean
  }) => {
    setModalMessage(message)
    setIsSuccessModal(isSuccess)
    setIsModalOpen(true)
  }

  return {
    isModalOpen,
    modalMessage,
    isSuccessModal,
    setIsModalOpen,
    showModal,
  }
}

export default useSuccessError
