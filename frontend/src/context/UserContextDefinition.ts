import { createContext } from 'react';
import { Usuario } from '../services/usuario.service';

export interface UserContextType {
  user: Usuario | null;
  setUser: (user: Usuario | null) => void;
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined); 