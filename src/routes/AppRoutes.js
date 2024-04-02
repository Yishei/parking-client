import urls from "../utilities/urls.json";
import { apiService } from "../utilities/apiService";
import { singOut } from "../utilities/AuthFunctionality";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Global Components
import PasswordSetUp from "../GlobalComponents/PasswordSetUp";
import ErrorPage from "../GlobalComponents/ErrorPage/ErrorPage";
import ErrorBoundary from "../ErrorBoundary";

// Admin Components
import CAdminLots from "../CAdminComponents/CAdminLots/CAdminLots";
import TableCondos from "../AppComponents/tables/TableCondos";
import TableUnits from "../AppComponents/tables/TableUnits";
import TableUsers from "../AppComponents/tables/TableUsers";
import TableCamera from "../AppComponents/tables/TableCamera";
import TableLogs from "../AppComponents/tables/TableLogs";
import CondoPage from "../AppComponents/adminComponents/CondoPage";
import ResidentHome from "../ResidentComponents/ResidentHome/ResidentHome";
import Cars from "../ResidentComponents/Cars/Cars";
import Payments from "../ResidentComponents/Payments/Payments";
import Login from "../GlobalComponents/Login/Login";
import OtpReq from "../GlobalComponents/OtpReq/OtpReq";
import NotFound from "../GlobalComponents/NotFound/NotFound";
import CAdminHome from "../CAdminComponents/CAdminHome/CAdminHome";

const baseurl = urls.baseURl;

const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" errorElement={<ErrorBoundary />}>
        <Route path="logIn" element={<Login />} loader={() => singOut()} />
        <Route path="forgotPassword" element={<OtpReq />} />
        <Route path="passwordSetUp/:token" element={<PasswordSetUp />} />
        <Route path="notFound" element={<NotFound />} />
        <Route path="errorPage" element={<ErrorPage />} />
        <Route
          path="resident"
          loader={(params) =>
            apiService.get(`${baseurl}${urls.get.unitsForUser}`)
          }
          element={<ResidentHome />}
        >
          <Route path="cars/:unitId" element={<Cars />} />
          <Route path="payments/:unitId" element={<Payments />} />
        </Route>
        <Route path="driver" element={<div>driver</div>}>
          {/* All driver routes */}
        </Route>
        <Route path="condo-admin" element={<CAdminHome />}>
          <Route
            index
            element={<TableCondos />}
            loader={() =>
              apiService.get(`${baseurl}${urls.get.condosForAdmin}`)
            }
          />
          <Route
            path="lots/:condoId"
            element={<CAdminLots />}
            loader={(params) =>
              apiService.get(
                `${baseurl}${urls.get.lotsForCondo}${params.params.condoId}`
              )
            }
          />
          <Route
            path="units/:condoId"
            element={<TableUnits />}
            loader={(params) =>
              apiService.get(
                `${baseurl}${urls.get.unitsForCondo}${params.params.condoId}`
              )
            }
          />
          <Route
            path="cameras/:lotId"
            element={<TableCamera />}
            loader={(params) =>
              apiService.get(
                `${baseurl}${urls.get.camerasForLot}${params.params.lotId}`
              )
            }
          />
          <Route
            path="users/:condoId"
            element={<TableUsers />}
            loader={(params) =>
              apiService.get(
                `${baseurl}${urls.get.usersForCondo}${params.params.condoId}`
              )
            }
          />
          <Route
            path="logs/:condoId"
            element={<TableLogs />}
            loader={(params) =>
              apiService.get(
                `${baseurl}${urls.get.logsForLot}${params.params.condoId}`
              )
            }
          />
          <Route path="profile" element={<div>profile</div>} />
          <Route path="settings" element={<h1>settings</h1>} />
          <Route path="contact" element={<h1>Contact</h1>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

export default appRoutes;
