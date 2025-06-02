import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { getMe } from "../api/auth";
import { AuthContext } from "./AuthContext";
import type { SignInRes } from "../api/responseTypes";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SignInRes>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (error: any) {
        navigate("/login");
      }
    };

    fetchMe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
