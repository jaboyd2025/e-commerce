import NextAuth, { DefaultSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { authConfig } from './auth.config'
import bcrypt from 'bcryptjs'
import Credentials from 'next-auth/providers/credentials'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role?: 'USER' | 'ADMIN'
    } & DefaultSession['user']
  }
}

interface User {
  id: string
  email: string
  name: string | null
  image: string | null
  role: 'USER' | 'ADMIN'
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        } as User
      },
    }),
  ],
}) 