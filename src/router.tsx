import { createBrowserRouter } from "react-router";
import { SignUp } from "./pages/signup";
import { AuthProvider } from "./auth/AuthProvider";
import App from "./App";
import { Login } from "./pages/login";
import AdminDashboard from "./pages/admin";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const root = document.getElementById("root");
if (root === null) throw new Error("Root container missing in index.html");

export const createRouter = () =>
  createBrowserRouter([
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
  ]);
