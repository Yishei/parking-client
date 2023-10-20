import React, { useEffect, useState } from "react";
import { CarTwoTone } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  InputNumber,
  Select,
} from "antd";
import {
  CondoSettingsTowingSelection,
  LotsTableSelection,
  testCarList,
} from "../utilities/menuItems";
import CustomLoadingIndecator from "./CustomLoadingIndecator";

const DrawerUnit = ({
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
        title="Unit Settings"
        width={500}
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
                <Form.Item name="unit_id" label="Unit ID">
                  <Input
                    addonBefore="#"
                    placeholder="This will be auto generated"
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="condo_id"
                  label="Condo"
                  rules={[
                    {
                      required: true,
                      message: "Please choose the Condo",
                    },
                  ]}
                >
                  <Select
                    options={LotsTableSelection}
                    optionFilterProp="children"
                    placeholder="Select Condo"
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
            <Row gutter={16} key={"2"}>
              <Col span={12}>
                <Form.Item
                  name="user_id"
                  label="Resident"
                  rules={[
                    {
                      required: false,
                      message: "Select Resident",
                    },
                  ]}
                >
                  <Select
                    options={CondoSettingsTowingSelection}
                    optionFilterProp="children"
                    placeholder="Select Resident"
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
              <Col span={12}>
                <Form.Item
                  name="max_cars"
                  label="Max Cars"
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
                    onChange={(value) => {
                      setCarsAllowed(value);
                    }}
                    defaultValue={carsAllowed}
                  />
                </Form.Item>
              </Col>
            </Row>
            {cars.map((car, index) => (
              <Row gutter={16} key={index + 5}>
                <Col span={24}>
                  <Form.Item
                    name={car.value}
                    label={car.label}
                    initialValue={car.value}
                    rules={[
                      {
                        required: true,
                        message: "Please enter Plate Number",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                      }}
                      addonBefore={<CarTwoTone />}
                      placeholder={`Enter ${car.label}`}
                      maxLength={10}
                    />
                  </Form.Item>
                </Col>
              </Row>
            ))}

            <Row gutter={16} key={"4"}>
              <Col span={24}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Unit Indecator",
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    placeholder="Enter Unit Indecator"
                  />
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
export default DrawerUnit;
