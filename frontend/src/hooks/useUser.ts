import { useContext } from 'react';
import { UserContext, UserContextType } from '../context/UserContextDefinition';

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
}; 