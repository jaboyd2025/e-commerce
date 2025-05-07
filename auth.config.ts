import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
} satisfies NextAuthConfig 