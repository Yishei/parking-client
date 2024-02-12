import urls from "../utilities/urls.json";
import { apiService } from "../utilities/apiService";
import { singOut } from "../utilities/AuthFunctionality";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Global Components
import GlobalBody from "../GlobalComponents/GlobalBody";
import PasswordSetUp from "../GlobalComponents/PasswordSetUp";
import LoginForm from "../GlobalComponents/LoginForm";
import NotFound from "../GlobalComponents/NotFound";
import ErrorPage from "../GlobalComponents/ErrorPage";
import ErrorBoundary from "../ErrorBoundary";
import OtpReq from "../GlobalComponents/OtpReq";

// Admin Components
import AppBody from "../AppComponents/AppBody";
import TableCondos from "../AppComponents/tables/TableCondos";
import TableLots from "../AppComponents/tables/TableLots";
import TableUnits from "../AppComponents/tables/TableUnits";
import TableUsers from "../AppComponents/tables/TableUsers";
import TableCamera from "../AppComponents/tables/TableCamera";
import TableLogs from "../AppComponents/tables/TableLogs";
import CondoPage from "../AppComponents/adminComponents/CondoPage";
import ResidentHome from "../AppComponents/residentComponents/ResidentHome";

const baseurl = urls.baseURl;

const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<GlobalBody />} errorElement={<ErrorBoundary />}>
        <Route path="logIn" element={<LoginForm />} loader={() => singOut()} />
        <Route path="forgotPassword" element={<OtpReq />} />
        <Route path="resetPassword/:token" element={<PasswordSetUp />} />
        <Route path="notFound" element={<NotFound />} />
        <Route path="errorPage" element={<ErrorPage />} />
        <Route path="resident" element={<ResidentHome />}>
          {/* All superAdmin routes */}
        </Route>
        <Route path="driver" element={<div>driver</div>}>
          {/* All driver routes */}
        </Route>
        <Route path="admin" element={<CondoPage />}>
          {/* All admin routes */}
          <Route
            path="lots/:condoId"
            element={<TableLots />}
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
        </Route>
        <Route path="host" element={<AppBody />}>
          <Route
            index
            element={<TableCondos />}
            loader={() =>
              apiService.get(`${baseurl}${urls.get.condosForAdmin}`)
            }
          />
          <Route
            path="lots/:condoId"
            element={<TableLots />}
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
            path="lots/cameras/:lotId"
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
