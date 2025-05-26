import { createBrowserRouter } from "react-router";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";

const root = document.getElementById("root");
if (root === null) throw new Error("Root container missing in index.html");

export const createRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      children: [],
    },
    {
      path: "/register",
      element: <SignUp />,
    },
  ]);
