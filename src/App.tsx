import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createRouter } from "./router";
import { RouterProvider } from "react-router";

const queryClient = new QueryClient();

export function App() {
  const router = createRouter();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
