import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { createRouter } from "./router.tsx";

const router = createRouter();

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
