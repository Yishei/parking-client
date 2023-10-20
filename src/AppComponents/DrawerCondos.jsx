import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import CustomLoadingIndecator from "./CustomLoadingIndecator";
import { getTowings } from "../utilities/fetchData";

const DrawerCondos = ({
  drawerOpen,
  setDrawerOpen,
  isEdit,
  setIsEdit,
  editRecord,
  setEditRecord,
}) => {
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [TowingDriverSelection, setTowingDriverSelection] = useState([]);
  const [form] = Form.useForm();
  const onClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (drawerOpen) {
      const res = getTowings(editRecord?.condo_id);
      res.then((data) => {
        setTowingDriverSelection(data);
      });
    }
  }, [editRecord, drawerOpen]);

  useEffect(() => {
    if (isEdit && drawerOpen) {
      const {
        condo_id,
        condo_admin_id,
        city,
        condo_address,
        state,
        zip_code,
        towing_driver_id,
        max_cars,
      } = editRecord;
      form.setFieldsValue({
        condo_id: condo_id,
        condo_admin_id: condo_admin_id,
        condo_address: condo_address,
        city: city,
        state: state,
        zip_code: zip_code,
        towing_driver_id: TowingDriverSelection.find(
          (item) => item.value === towing_driver_id
        )?.label,
        max_cars,
      });
    }
  }, [isEdit, drawerOpen, editRecord, form, TowingDriverSelection]);

  return (
    <>
      <Drawer
        title="Condo Settings"
        width={500}
        onClose={onClose}
        open={drawerOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <CustomLoadingIndecator loading={SubmitLoading}>
          <Form form={form} layout="vertical" requiredMark={false}>
            <Row gutter={16} key={"1"}>
              <Col span={12}>
                <Form.Item name="condo_id" label="Condo ID">
                  <Input
                    addonBefore="#"
                    placeholder="This will be auto generated"
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="condo_admin_id" label="Condo Admin">
                  <Input
                    style={{
                      width: "100%",
                    }}
                    addonBefore={<UserOutlined />}
                    placeholder="TODO You"
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} key={"2"}>
              <Col span={24}>
                <Form.Item
                  name="towing_driver_id"
                  label="Towing Driver"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the Towing Driver",
                    },
                  ]}
                >
                  <Select
                    options={TowingDriverSelection}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLocaleLowerCase()
                        .includes(input.toLocaleLowerCase())
                    }
                    notFoundContent={
                      <div>
                        Driver Not Fownd{" "}
                        <NavLink to={`/users/${editRecord?.condo_id}`}>
                          create one
                        </NavLink>
                      </div>
                    }
                    showSearch
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} key={"3"}>
              <Col span={24}>
                <Form.Item
                  name="condo_address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter The Address",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    placeholder="Enter Address"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} key={"4"}>
              <Col span={12}>
                <Form.Item
                  name="city"
                  label="City"
                  rules={[
                    {
                      required: true,
                      message: "Please enter The City",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    placeholder="Enter City"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="state"
                  label="State"
                  rules={[
                    {
                      required: true,
                      message: "Please enter The State",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    placeholder="Enter State"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} key={"5"}>
              <Col span={12}>
                <Form.Item
                  name="zip_code"
                  label="Zip Code"
                  rules={[
                    {
                      required: true,
                      message: "Please enter The Zip Code",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    placeholder="Enter Zip Code"
                    maxLength={5}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="max_cars"
                  label="Default Max Cars"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a number 1-5",
                    },
                  ]}
                >
                  <InputNumber
                    style={{
                      width: "100%",
                    }}
                    placeholder="Enter Max Cars"
                    min={1}
                    max={5}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div style={{ paddingTop: 30 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Button
                  onClick={() => {
                    setIsEdit(false);
                    setDrawerOpen(false);
                  }}
                  style={{
                    width: "100%",
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  loading={SubmitLoading}
                  type="primary"
                  onClick={() => {
                    form
                      .validateFields()
                      .then((values) => {
                        setSubmitLoading(true);
                        setTimeout(() => {
                          setSubmitLoading(false);
                          onClose();
                        }, 2000);
                      })
                      .catch((info) => {
                        console.log("Validate Failed:", info);
                      });
                  }}
                  style={{
                    width: "100%",
                  }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </CustomLoadingIndecator>
      </Drawer>
    </>
  );
};
export default DrawerCondos;
