import "./styles/ResidentHome.css";
import "./styles/sidebar.css";
import "./styles/carPage.css";
import CarPage from "./CarPage";
import Sidebar from "./Sidebar";
import ResidentHeader from "./ResidentHeader";

const ResidentHome = () => {
  return (
    <div className="app-container">
      <Sidebar className="side-bar" />
      <div className="app-body-container">
        <ResidentHeader />
        <div className="app-body">
          <CarPage />
        </div>
      </div>
    </div>
  );
};

export default ResidentHome;
