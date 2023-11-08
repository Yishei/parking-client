import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppBody from "../AppComponents/AppBody";
import TableCondos from "../AppComponents/tables/TableCondos";
import TableLots from "../AppComponents/tables/TableLots";
import TableUnits from "../AppComponents/tables/TableUnits";
import TableUsers from "../AppComponents/tables/TableUsers";
import TableCamera from "../AppComponents/tables/TableCamera";
import TableLogs from "../AppComponents/tables/TableLogs";
import LoginForm from "../AppComponents/LoginForm";
import NotFound from "../AppComponents/NotFound";
//import Settings from "../AppComponents/Settings";
import {
  getCameras,
  getCondos,
  getLogs,
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
          path="lots/:condoId"
          element={<TableLots />}
          loader={(params) => getLots(params.params.condoId)}
        />
        <Route
          path="units/:condoId"
          element={<TableUnits />}
          loader={(params) => getUnits(params.params.condoId)}
        />
        <Route
          path="lots/cameras/:lotId"
          element={<TableCamera />}
          loader={(params) => getCameras(params.params.lotId)}
        />
        <Route
          path="users/:condoId"
          element={<TableUsers />}
          loader={(params) => getUsers(params.params.condoId)}
        />
        <Route
          path="lots/logs/:lotId"
          element={<TableLogs />}
          loader={(params) => getLogs(params.params.lotId)}
        />
        <Route path="profile" element={<div>profile</div>} />
        <Route path="settings" element={<h1>settings</h1>} />
        <Route path="contact" element={<h1>Contact</h1>} />
        <Route path="login" element={<LoginForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default appRoutes;
