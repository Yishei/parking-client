import React, { useEffect, useState, useContext } from "react";
import { MessageContext } from "../../Context/MessageContext";
import { Card, Typography, Descriptions, Menu, Layout } from "antd";
import { apiService } from "../../utilities/apiService";
import urls from "../../utilities/urls.json";
import { Content } from "antd/es/layout/layout";
import { Outlet, useNavigation, Navigate } from "react-router-dom";
import DrawerCondos from "../drawers/DrawerCondos";
import { condoAdminRouteOptions } from "../../utilities/menuItems";
import AppHeader from "../AppHeader";
import CustomLoadingIndecator from "../../GlobalComponents/CustomLoadingIndecator";
const { Footer } = Layout;

const { Title } = Typography;

const CondoPage = () => {
  const navigation = useNavigation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [condo, setCondo] = useState(null);
  const { msg } = useContext(MessageContext);

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
        console.log(res);
        setCondo(res[0]);
      } catch (err) {
        console.log(err.status);
        if (err.status === 401) {
          <Navigate to="/login" />;
          msg("error", "Please login again");
        } else {
          msg("error", "Error getting condo");
        }
      }
    };

    fetchCondo();
  }, [msg]);

  const handleEdit = () => {
    setDrawerOpen(true);
  };

  return (
    <>
      <AppHeader />
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
            title={<Title level={2}>My Condo</Title>}
            style={{
              width: "100%",
              height: "40%",
              margin: "5px",
              borderRadius: "10px",
            }}
            bodyStyle={{ padding: "20px" }}
            hoverable
            onClick={handleEdit}
          >
            <Descriptions layout="vertical">
              <Descriptions.Item label="ID">{condo.condo_id}</Descriptions.Item>
              <Descriptions.Item label="City">{condo.city}</Descriptions.Item>
              <Descriptions.Item label="State">{condo.state}</Descriptions.Item>
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
          </Card>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Menu
              style={{ width: "100%" }}
              mode="horizontal"
              items={condoAdminRouteOptions(condo.condo_id)}
            />
          </div>
          <Content style={{ padding: "10px 0px" }}>
            <CustomLoadingIndecator loading={navigation.state === "loading"}>
              <Outlet />
            </CustomLoadingIndecator>
          </Content>
          <Footer style={{ marginTop: "auto" }}>
            SafetyHood ©2023 Created by SafetyHood
          </Footer>
        </>
      )}
    </>
  );
};

export default CondoPage;
