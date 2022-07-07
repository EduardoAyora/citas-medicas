import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../../../src/lib/db'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        username: { label: 'Usuario', type: 'text', placeholder: 'Usuario' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials.password)
          throw new Error('El usuario y la contraseña son requeridos')
        const user = await prisma.usuario.findUnique({
          where: {
            username: credentials.username,
          },
        })
        if (!user) throw new Error('No se encontró el usuario')
        if (user.password !== credentials.password)
          throw new Error('La contraseña no es correcta')
        return { name: user.name, role: user.role, username: user.username, id: user.id }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})
