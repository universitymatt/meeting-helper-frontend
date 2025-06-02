import { createContext, useContext } from "react";

interface AuthContextType {
  user?: {
    username: string;
    name: string;
    roles: string[];
  };
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
});

export const useAuthContext = () => useContext(AuthContext);
