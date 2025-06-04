import { useLayoutEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { getMe } from "../api/users";
import { AuthContext } from "./AuthContext";
import type { SignInRes } from "../api/responseTypes";

export const AuthProvider = ({
  admin = false,
  children,
}: {
  admin?: boolean;
  children: ReactNode;
}) => {
  const [user, setUser] = useState<SignInRes>();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
        if (admin) {
          if (!response.data.role_names.includes("admin")) {
            navigate("/");
          }
        }
      } catch (error: any) {
        navigate("/login");
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
