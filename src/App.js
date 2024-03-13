import { RouterProvider } from "react-router-dom";
import "./App.css";
import appRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="app">
      <RouterProvider router={appRoutes} />
    </div>
  );
}

export default App;
