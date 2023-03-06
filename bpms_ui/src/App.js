import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ApplicationRoutes from "./routes/ApplicationRoutes";

function App() {
  return (
    <>
      <div>
        <ApplicationRoutes />
      </div>
    </>
  );
}

export default App;
