import React from 'react'
import { useAuthContext } from '../../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { MAIN_ROUTES } from '../../../routes/paths'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext()
  return (
    isAuthenticated ? <>{children}</> : <Navigate to={MAIN_ROUTES.HOME} />
  )
}

export { AuthGuard }