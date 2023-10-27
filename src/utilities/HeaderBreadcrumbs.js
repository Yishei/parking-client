import { NavLink } from "react-router-dom";
import {
  CarTwoTone,
  HomeTwoTone,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FcDataSheet } from "react-icons/fc";
import { FaWarehouse } from "react-icons/fa";
import { BsFillCameraReelsFill } from "react-icons/bs";

export const HomeBreadcrumb = () => {
  return {
    name: "Condo Table",
    breadcrumbItems: [
      {
        title: <HomeOutlined />,
      },
    ],
  };
};

export const LotInfoBredcrumb = ({ id }) => {
  return {
    name: "Condo Lots",
    breadcrumbItems: [
      {
        title: (
          <NavLink to="/app/">
            <HomeOutlined />
          </NavLink>
        ),
      },
      {
        title: "Condo Lots",
        menu: {
          items: [
            {
              key: "1",
              label: (
                <NavLink to={`/app/units/${id}`}>
                  <HomeTwoTone /> Units
                </NavLink>
              ),
            },
            {
              key: "3",
              label: (
                <NavLink to={`/app/users/${id}`}>
                  <UserOutlined style={{ color: "rgb(22, 119, 255)" }} /> Users
                </NavLink>
              ),
            },
          ],
        },
      },
    ],
  };
};

export const UnitInfoBredcrumb = ({ id }) => {
  return {
    name: "Condo Units",
    breadcrumbItems: [
      {
        title: (
          <NavLink to="/app/">
            <HomeOutlined />
          </NavLink>
        ),
      },
      {
        title: "Condo Units",
        menu: {
          items: [
            {
              key: "1",
              label: (
                <NavLink to={`/app/lots/${id}`}>
                  <FaWarehouse /> Lots
                </NavLink>
              ),
            },
            {
              key: "3",
              label: (
                <NavLink to={`/app/users/${id}`}>
                  <UserOutlined style={{ color: "rgb(22, 119, 255)" }} /> Users
                </NavLink>
              ),
            },
          ],
        },
      },
    ],
  };
};

export const UsersInfoBredcrumb = ({ id }) => {
  return {
    name: "Condo Users",
    breadcrumbItems: [
      {
        title: (
          <NavLink to="/app/">
            <HomeOutlined />
          </NavLink>
        ),
      },
      {
        title: "Condo Users",
        menu: {
          items: [
            {
              key: "1",
              label: (
                <NavLink to={`/app/units/${id}`}>
                  <HomeTwoTone /> Units
                </NavLink>
              ),
            },
            {
              key: "3",
              label: (
                <NavLink to={`/app/lots/${id}`}>
                  <CarTwoTone /> Lots
                </NavLink>
              ),
            },
          ],
        },
      },
    ],
  };
};

export const CameraInfoBredcrumb = ({ id }) => {
  return {
    name: `Lot Cameras (${id})`,
    breadcrumbItems: [
      {
        title: (
          <NavLink to="/app/">
            <HomeOutlined />
          </NavLink>
        ),
      },
      {
        title: <NavLink to={`/app/lots/${id}`}>Lots</NavLink>,
        menu: {
          items: [
            {
              key: "1",
              label: (
                <NavLink to={`/app/units/${id}`}>
                  <HomeTwoTone /> Units
                </NavLink>
              ),
            },
            {
              key: "2",
              label: (
                <NavLink to={`/app/lots/${id}`}>
                  <CarTwoTone /> Lots
                </NavLink>
              ),
            },
            {
              key: "3",
              label: (
                <NavLink to={`/app/users/${id}`}>
                  <UserOutlined style={{ color: "rgb(22, 119, 255)" }} /> Users
                </NavLink>
              ),
            },
          ],
        },
      },
      {
        title: "Lot Cameras",
        menu: {
          items: [
            {
              key: "1.1",
              label: (
                <NavLink to={`/app/lots/logs/${id}`}>
                  <FcDataSheet />
                  Logs
                </NavLink>
              ),
            },
          ],
        },
      },
    ],
  };
};

export const LogInfoBredcrumb = ({ id }) => {
  return {
    name: `Lot Logs`,
    breadcrumbItems: [
      {
        title: (
          <NavLink to="/app/">
            <HomeOutlined />
          </NavLink>
        ),
      },
      {
        title: <NavLink to={`/app/lots/${id}`}>Lots</NavLink>,
        menu: {
          items: [
            {
              key: "1",
              label: (
                <NavLink to={`/app/units/${id}`}>
                  <HomeTwoTone /> Units
                </NavLink>
              ),
            },
            {
              key: "2",
              label: (
                <NavLink to={`/app/lots/${id}`}>
                  <FaWarehouse /> Lots
                </NavLink>
              ),
            },
            {
              key: "3",
              label: (
                <NavLink to={`/app/users/${id}`}>
                  <UserOutlined style={{ color: "rgb(22, 119, 255)" }} /> Users
                </NavLink>
              ),
            },
          ],
        },
      },
      {
        title: "Camera Logs",
        menu: {
          items: [
            {
              key: "1.1",
              label: (
                <NavLink to={`/app/lots/cameras/${id}`}>
                  <BsFillCameraReelsFill/>
                  Lot Cameras
                </NavLink>
              ),
            },
          ],
        },
      },
    ],
  };
};

export const settingsBreadcrumb = () => {
  return {
    name: "Settings",
    breadcrumbItems: [
      {
        href: "/app/",
        title: <HomeOutlined />,
      },
      {
        title: "Settings",
      },
    ],
  };
};

export const profileBreadcrumb = () => {
  return {
    name: "Profile",
    breadcrumbItems: [
      {
        title: (
          <NavLink to="/app/">
            <HomeOutlined />
          </NavLink>
        ),
      },
      {
        title: <NavLink to="/settings">Settings</NavLink>,
      },
      {
        title: "Profile",
      },
    ],
  };
};
