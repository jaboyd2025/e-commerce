import { middleware } from "./middleware.config"

export default middleware((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")
  const isOnAuth = req.nextUrl.pathname.startsWith("/auth")

  if (isOnAdmin && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", req.nextUrl))
  }

  if (isOnAuth && isLoggedIn) {
    return Response.redirect(new URL("/", req.nextUrl))
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} 