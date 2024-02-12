import React, { useEffect, useState, useContext } from "react";
import { MessageContext } from "../../Context/MessageContext";
import { Card, Descriptions, Menu, Layout, Collapse } from "antd";
import { apiService } from "../../utilities/apiService";
import urls from "../../utilities/urls.json";
import { Content } from "antd/es/layout/layout";
import {
  Outlet,
  useNavigation,
  useNavigate,
  useLocation,
} from "react-router-dom";
import DrawerCondos from "../drawers/DrawerCondos";
import { condoAdminRouteOptions } from "../../utilities/menuItems";
import CustomLoadingIndecator from "../../GlobalComponents/CustomLoadingIndecator";
import HeadPopover from "../HeadPopover";
const { Footer } = Layout;

const CondoPage = () => {
  const [activeKey, setActiveKey] = useState(["1"]);
  const navigation = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [condo, setCondo] = useState(null);
  const { msg } = useContext(MessageContext);

  const handlePanelChange = (newActiveKey) => {
    if (newActiveKey[0] === "2") {
      navigate(`lots/${condo.condo_id}`);
    } else {
      navigate(`/admin`);
    }
    setActiveKey(newActiveKey);
  };

  const fetchData = async () => {
    setCardLoading(true);
    const data = await apiService.get(
      `${urls.baseURl}${urls.get.condosForAdmin}`
    );
    if (data.length > 0) {
      setCondo(data[0]);
    } else {
      msg("error", "Error Getting Data");
    }
    setCardLoading(false);
  };

  useEffect(() => {
    const fetchCondo = async () => {
      // Replace '1' with the actual condo ID
      try {
        const res = await apiService.get(
          `${urls.baseURl}${urls.get.condosForAdmin}`
        );
        setCondo(res[0]);
      } catch (err) {
        if (err.status === 401) {
          alert("Please login again");
          navigate("/login");
          msg("error", "Please login again");
        } else {
          msg("error", "Error getting condo");
        }
      }
    };

    fetchCondo();
  }, [msg, navigate]);

  const handleEdit = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      {/* <AppHeader /> */}
      {condo && (
        <>
          <DrawerCondos
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            editRecord={condo}
            isEdit={true}
            fetchData={fetchData}
          />
          <Card
            bordered
            type="inner"
            loading={cardLoading}
            title={
              <a href="/">
                <img
                  style={{ margin: "12px" }}
                  src="/safetyhood.svg"
                  alt="Safetyhood"
                  width="150"
                  height="75"
                />
              </a>
            }
            extra={
              <div>
                <HeadPopover />
              </div>
            }
            style={{
              width: "100%",
              height: "40%",
              margin: "0px",
              // borderRadius: "10px",

              borderTopRightRadius: "0px",
              borderTopLeftRadius: "0px",
            }}
            headStyle={{ backgroundColor: "rgb(29, 113, 185)" }}
            bodyStyle={{ padding: "0px", borderRadius: "0px" }}
            hoverable
            //onClick={handleEdit}
          >
            <Collapse
              accordion
              defaultActiveKey={activeKey}
              onChange={handlePanelChange}
            >
              <Collapse.Panel
                header="My Condo"
                key="1"
                style={{ padding: "0px" }}
              >
                <div style={{ padding: "20px" }} onClick={handleEdit}>
                  <Descriptions layout="vertical">
                    <Descriptions.Item label="ID">
                      {condo.condo_id}
                    </Descriptions.Item>
                    <Descriptions.Item label="City">
                      {condo.city}
                    </Descriptions.Item>
                    <Descriptions.Item label="State">
                      {condo.state}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                      {condo.condo_address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Zip Code">
                      {condo.zip_code}
                    </Descriptions.Item>
                    <Descriptions.Item label="Driver">
                      {condo.towing_driver_id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Max Cars">
                      {condo.max_cars}
                    </Descriptions.Item>
                    <Descriptions.Item label="Count of Lots">
                      {condo.lot_count}
                    </Descriptions.Item>
                    <Descriptions.Item label="Count of Units">
                      {condo.unit_count}
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </Collapse.Panel>
              <Collapse.Panel
                header="Details"
                key="2"
                style={{ padding: "0px" }}
              >
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Menu
                      style={{ width: "100%" }}
                      mode="horizontal"
                      items={condoAdminRouteOptions(condo.condo_id)}
                      selectedKeys={[location.pathname.split("/")[2]]}
                    />
                  </div>
                  <Content style={{ padding: "10px 0px" }}>
                    <CustomLoadingIndecator
                      loading={navigation.state === "loading"}
                    >
                      <Outlet />
                    </CustomLoadingIndecator>
                  </Content>
                  ,
                </>
              </Collapse.Panel>
            </Collapse>
          </Card>
          <Footer style={{ marginTop: "auto" }}>
            SafetyHood ©2023 Created by SafetyHood
          </Footer>
        </>
      )}
    </>
  );
};

export default CondoPage;
