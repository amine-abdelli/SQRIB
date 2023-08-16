import React from 'react'
import { useGetSelf } from '../api/queries/useGetSelf.hook';
import { UserBase } from '@sqrib/shared';
import { useLogout } from '../api/queries/useLogout.hook';

export type JWTContextType = {
  isAuthenticated: boolean;
  user: UserBase | undefined;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = React.createContext<JWTContextType | null>(null);

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) throw new Error('useAuthContext context must be used inside AuthProvider');

  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { mutateAsync } = useLogout();

  const logout = React.useCallback(async () => {
    await mutateAsync();
  }, []);

  const { isAuthenticated, user, loading } = useGetSelf({
    onError: () => { logout() }
  });

  const memoizedValue = React.useMemo(
    () => ({
      isAuthenticated: isAuthenticated,
      user,
      logout,
      loading
    }),
    [isAuthenticated, user, logout, loading]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};