import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../pages/login'

describe('Login', () => {
  test('Se habilita el botón para hacer login', async () => {
    render(<Login />)

    const usernameTextInput = screen.getByLabelText('Usuario')
    const passwordTextInput = screen.getByLabelText('Contraseña')

    const loginButton = screen.getByRole('button', { name: 'Ingresar' })
    expect(loginButton).toBeDisabled()

    await userEvent.type(usernameTextInput, 'eduardoayora')
    await userEvent.type(passwordTextInput, 'eduardoayora')

    expect(loginButton).toBeEnabled()
  })
})
