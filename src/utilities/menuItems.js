import { NavLink } from "react-router-dom";
import { FaWarehouse } from "react-icons/fa";
import { PiHouseLight } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { GoDeviceCameraVideo } from "react-icons/go";

export const condoAdminRouteOptions = (condoId) => {
  return [
    {
      label: <NavLink to={`/resident/lots/${condoId}`}>Lots</NavLink>,
      icon : <FaWarehouse />,
      key: "1",
    },
    {
      label: <NavLink to={`/resident/units/${condoId}`}>Units</NavLink>,
      icon : <PiHouseLight />,
      key: "2",
    },
    {
      label: <NavLink to={`/resident/users/${condoId}`}>Users</NavLink>,
      icon : <FaUser />,
      key: "3",
    },
    {
      label: <NavLink to={`/resident/logs/${condoId}`}>Camera Logs</NavLink>,
      icon : <GoDeviceCameraVideo />,
      key: "4",
    }
  ];
};
