import { NavLink } from "react-router-dom";
import { FaWarehouse } from "react-icons/fa";
import { PiHouseLight } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { GoDeviceCameraVideo } from "react-icons/go";

export const condoAdminRouteOptions = (condoId) => {
  return [
    {
      label: <NavLink to={`/admin/lots/${condoId}`}>Lots</NavLink>,
      icon : <FaWarehouse />,
      key: "lots",
    },
    {
      label: <NavLink to={`/admin/units/${condoId}`}>Units</NavLink>,
      icon : <PiHouseLight />,
      key: "units",
    },
    {
      label: <NavLink to={`/admin/users/${condoId}`}>Users</NavLink>,
      icon : <FaUser />,
      key: "users",
    },
    {
      label: <NavLink to={`/admin/logs/${condoId}`}>Camera Logs</NavLink>,
      icon : <GoDeviceCameraVideo />,
      key: "logs",
    }
  ];
};
