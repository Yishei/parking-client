import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Layout } from "antd";
import appRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <RouterProvider router={appRoutes} />
    </Layout>
  );
}

export default App;
