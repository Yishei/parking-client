import { RouterProvider } from "react-router-dom";
import "./App.css";
import appRoutes from "./routes/AppRoutes";
import { useContext } from "react";
import MessageContext from "./Context/MessageContext";

function App() {
  const { contextHolder } = useContext(MessageContext);
  return (
    <div className="app">
      {contextHolder}
      <RouterProvider router={appRoutes} />
    </div>
  );
}

export default App;
