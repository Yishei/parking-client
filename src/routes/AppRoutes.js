import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppBody from "../AppComponents/AppBody";
import TableCondos from "../AppComponents/TableCondos";
import TableLots from "../AppComponents/TableLots";
import LoginForm from "../AppComponents/LoginForm";
import TableUnits from "../AppComponents/TableUnits";
import TableUsers from "../AppComponents/TableUsers";
import TableCamera from "../AppComponents/TableCamera";
//import Settings from "../AppComponents/Settings";
import {
  getCameras,
  getCondos,
  getLots,
  getUnits,
  getUsers,
} from "../utilities/fetchData";

const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/app" element={<AppBody />}>
        <Route index element={<TableCondos />} loader={getCondos} />
        <Route
          path="lots/:condoId?"
          element={<TableLots />}
          loader={(params) => getLots(params.params.condoId)}
        />
        <Route
          path="units/:condoId?"
          element={<TableUnits />}
          loader={(params) => getUnits(params.params.condoId)}
        />
        <Route
          path="lots/cameras/:lotId?"
          element={<TableCamera />}
          loader={(params) => getCameras(params.params.lotId)}
        />
        <Route
          path="users/:condoId?"
          element={<TableUsers />}
          loader={(params) => getUsers(params.params.condoId)}
        />
        <Route path="profile" element={<div>profile</div>} />
        <Route path="settings" element={<h1>settings</h1>} />
        <Route path="contact" element={<h1>Contact</h1>} />
        <Route path="login" element={<LoginForm />} />
      </Route>
      <Route path="*" element={<div>error page</div>} />
    </Route>
  )
);

export default appRoutes;
