import { MdOutlineBallot } from "react-icons/md";
import { RiCommunityLine } from "react-icons/ri";
import { BsBuildingExclamation } from "react-icons/bs";
import { FaBuildingUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export const items = [
  {
    key: 1,
    label: <NavLink to={`lots/28`}>Lots</NavLink>,
    icon: <MdOutlineBallot />,
  },
  {
    key: 2,
    label: <NavLink to={`units/28`}>Units</NavLink>,
    icon: <RiCommunityLine />,
  },
  {
    key: 3,
    label: <NavLink to={`users/28`}>Users</NavLink>,
    icon: <FaBuildingUser />,
  },
  {
    label: <NavLink to={`condo-info/28`}>Condo info</NavLink>,
    icon: <BsBuildingExclamation />,
  },
];
