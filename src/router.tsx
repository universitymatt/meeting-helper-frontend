import { createBrowserRouter } from "react-router";
import { SignUp } from "./pages/signup";
import { AuthProvider } from "./auth/AuthProvider";
import App from "./App";
import { Login } from "./pages/login";

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
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
  ]);
