import { useState, ReactNode, useMemo } from 'react';
import { Usuario } from '../services/usuario.service';
import { UserContext } from './UserContextDefinition';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const value = useMemo(() => ({
    user,
    setUser,
    isAuthenticated: !!user
  }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 