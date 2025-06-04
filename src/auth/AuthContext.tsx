import { createContext, useContext } from "react";

interface AuthContextType {
  user?: {
    username: string;
    name: string;
    role_names: string[];
  };
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
});

export const useAuthContext = () => useContext(AuthContext);
