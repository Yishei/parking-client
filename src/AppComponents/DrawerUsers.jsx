import React, { useEffect, useState } from "react";
import { PhoneTwoTone, MailTwoTone, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  InputNumber,
  Select,
  Switch,
} from "antd";
import { testCarList } from "../utilities/menuItems";
import CustomLoadingIndecator from "./CustomLoadingIndecator";

const DrawerUser = ({
  drawerOpen,
  setDrawerOpen,
  isEdit,
  setIsEdit,
  editRecord,
  setEditRecord,
}) => {
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [formEnable, setFormEnable] = useState(false);
  const [carsAllowed, setCarsAllowed] = useState(2);
  const [cars, setCars] = useState(testCarList);
  const [form] = Form.useForm();
  const onClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (cars.length < carsAllowed) {
      const newCars = [...cars];
      newCars.push({
        label: `Car ${newCars.length + 1}`,
        value: null,
      });
      setCars(newCars);
    }
    if (cars.length > carsAllowed) {
      const newCars = [...cars];
      newCars.splice(carsAllowed, newCars.length - carsAllowed);
      setCars(newCars);
    }
  }, [cars, carsAllowed]);

  return (
    <>
      <Drawer
        title="User Settings"
        width={560}
        onClose={() => {
          setFormEnable(false);
          onClose();
        }}
        open={drawerOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <CustomLoadingIndecator loading={SubmitLoading}>
          <Form
            form={form}
            disabled={!formEnable}
            layout="vertical"
            requiredMark={false}
          >
            <Row gutter={16} key={"1"}>
              <Col span={12}>
                <Form.Item name="user_id" label="User ID">
                  <Input
                    addonBefore="#"
                    placeholder="This will be auto generated"
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="is_active" label="Is Active">
                  <Switch
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} key={"2"}>
              <Col span={12}>
                <Form.Item
                  name="username"
                  label="User Name"
                  rules={[
                    {
                      required: true,
                      message: "Enter User Name",
                    },
                  ]}
                >
                  <Input
                    addonBefore={<UserOutlined />}
                    placeholder="Enter User Name"
                    maxLength={20}
                    minLength={3}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a Email address",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid Email address",
                    },
                  ]}
                >
                  <Input
                    addonBefore={<MailTwoTone />}
                    placeholder="Enter Email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} key={"3"}>
              <Col span={12}>
                <Form.Item
                  name="phone_number_main"
                  label="Phone Number (Main)"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a Phone Number",
                    },
                    {
                      type: "tel",
                      message: "Please enter a valid Phone Number",
                    },
                  ]}
                >
                  <InputNumber
                    controls={false}
                    style={{ width: "100%" }}
                    addonBefore={<PhoneTwoTone />}
                    placeholder="Enter Phone Number"
                    maxLength={11}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone_number_2"
                  label="Phone Number (Secondary)"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a Phone Number",
                    },
                    {
                      type: "tel",
                      message: "Please enter a valid Phone Number",
                    },
                  ]}
                >
                  <InputNumber
                    controls={false}
                    style={{ width: "100%" }}
                    addonBefore={<PhoneTwoTone />}
                    placeholder="Enter Phone Number"
                    maxLength={11}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} key={"4"}>
              <Col span={24}>
                <Form.Item
                  name="user_role"
                  label="User Role"
                  rules={[
                    {
                      required: true,
                      message: "Please Select The User Role",
                    },
                  ]}
                >
                  <Select defaultValue="c_admin">
                    <Select.Option value="c_admin">Admin</Select.Option>
                    <Select.Option value="user">User</Select.Option>
                    <Select.Option value="driver">Driver</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div style={{ paddingTop: 30 }}>
            <Row gutter={16}>
              {formEnable ? (
                <>
                  <Col span={12}>
                    <Button
                      onClick={() => {
                        setCarsAllowed(2);
                        form.resetFields();
                        setFormEnable(false);
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
                              setFormEnable(false);
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
                </>
              ) : (
                <Col span={24}>
                  <Button
                    onClick={() => {
                      setFormEnable(true);
                    }}
                    style={{
                      width: "100%",
                    }}
                  >
                    Edit
                  </Button>
                </Col>
              )}
            </Row>
          </div>
        </CustomLoadingIndecator>
      </Drawer>
    </>
  );
};
export default DrawerUser;
