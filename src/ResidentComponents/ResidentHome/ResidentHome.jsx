import "./ResidentHome.css";
import Sidebar from "../SideBar/Sidebar";
import ResidentHeader from "../ResidentHeader/ResidentHeader";
import { Outlet } from "react-router-dom";

const ResidentHome = () => {
  return (
    <div className="app-container">
      <Sidebar className="side-bar" />
      <div className="app-body-container">
        <ResidentHeader />
        <div className="app-body-inner">
          <div className="app-body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentHome;
