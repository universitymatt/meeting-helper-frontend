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
  const [isLoading, setIsLoading] = useState(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchMe();
  }, [navigate, admin]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
