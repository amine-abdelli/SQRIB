import React from 'react'
import { useAuthContext } from '../../../contexts/AuthContext'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext()
  return (
    isAuthenticated ? <>{children}</> : null
  )
}

export { AuthGuard }