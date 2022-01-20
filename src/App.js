import logo from "./logo.svg";
import "./App.css";
import Main from "./components/MainComponent";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <Main />
      </LocalizationProvider>
    </div>
  );
}

export default App;
