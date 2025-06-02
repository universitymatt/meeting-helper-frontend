import "./App.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dashboard from "./pages/dashboard";

export function App() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dashboard />
      </LocalizationProvider>
    </div>
  );
}

export default App;
