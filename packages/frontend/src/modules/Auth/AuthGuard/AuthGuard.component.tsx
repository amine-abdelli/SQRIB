import React from 'react'
import { useAuthContext } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { MAIN_ROUTES } from '../../../routes/paths'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthContext()

  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate(MAIN_ROUTES.HOME)
    }
  }, [isAuthenticated])

  return (
    isAuthenticated ? <>{children}</> : <></>
  )
}

export { AuthGuard }