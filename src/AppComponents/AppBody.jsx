import { useContext } from "react";
import "./styles/AppBody.css";
import { AppContext } from "../Context/AppContext";
import { Outlet, useNavigation } from "react-router-dom";
import { mainCardHeadStyle, mainCardStyle } from "../utilities/styleObjects";
import { Breadcrumb, Card, Layout } from "antd";
import AppHeader from "./AppHeader";
import CustomLoadingIndecator from "../GlobalComponents/CustomLoadingIndecator";
import { Helmet } from "react-helmet";
import Sidebar from "../ResidentComponents/ResidentHeader/SideBar/Sidebar";
import ResidentHeader from "../ResidentComponents/ResidentHeader/ResidentHeader";
const { Footer } = Layout;

const AppBody = () => {
  const navigation = useNavigation();
  const { appInnerHeadContent, loading } = useContext(AppContext);

  return (
    <div className="app-container">
      <Helmet>
        <title>{appInnerHeadContent.name}</title>
      </Helmet>
      <Sidebar className="side-bar" />
      <div className="app-body-container">
        <AppHeader />
        <div className="app-body">{/* <Outlet /> */}</div>
      </div>
    </div>
  );
};
export default AppBody;
