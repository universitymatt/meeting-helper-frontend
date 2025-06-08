import { createHashRouter } from "react-router";
import { SignUp } from "./pages/signup";
import { AuthProvider } from "./auth/AuthProvider";
import App from "./App";
import { Login } from "./pages/login";
import AdminDashboard from "./pages/admin";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Get the base URL from Vite config

export const createRouter = () =>
  createHashRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <App />
        </AuthProvider>
      ),
    },
    {
      path: "/admin",
      element: (
        <AuthProvider admin={true}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <AdminDashboard />
          </LocalizationProvider>
        </AuthProvider>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "*",
      element: <div>404 - Page Not Found</div>,
    },
  ]);
