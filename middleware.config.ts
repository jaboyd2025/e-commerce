import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
 
// Create a separate auth instance for middleware that doesn't use Prisma
export const { auth: middleware } = NextAuth(authConfig) 