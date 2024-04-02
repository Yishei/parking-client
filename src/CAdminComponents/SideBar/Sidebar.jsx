import "./sidebar.css";
import { Layout, Menu, theme } from "antd";
import React, { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import { items } from "./items";
const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { isMenuOpen } = useContext(AppContext);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="main-con">
      <Sider
        className="side-bar-menu"
        translate="true"
        trigger={null}
        width={275}
        collapsible
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
        collapsed={!isMenuOpen}
        style={{
          background: colorBgContainer,
        }}
      >
        <div className="logo-container">
          {!isMenuOpen ? (
            <div className="logo-inner-collapsed">
              <img
                style={{ marginLeft: "10px" }}
                src="/safetyhood-favicon.png"
                alt="Safetyhood"
              />
            </div>
          ) : (
            <div className="logo-inner-expend">
              <img
                style={{ marginLeft: "10px" }}
                src="/safetyhood.svg"
                alt="Safetyhood"
              />
            </div>
          )}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={items}
        />
      </Sider>
      {isMenuOpen && (
        <div className="side-bar-footer">
          SafetyHood &copy;{new Date().getFullYear()} <br /> Created by
          SafetyHood <br /> All Rights Reserved
        </div>
      )}
    </div>
  );
};

export default Sidebar;
