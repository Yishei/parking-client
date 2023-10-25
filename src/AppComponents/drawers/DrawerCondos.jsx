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
import CustomLoadingIndecator from "../CustomLoadingIndecator";
import {
  createCondo,
  getUsersOptions,
  updateCondo,
} from "../../utilities/fetchData";

const DrawerCondos = (props) => {
  const { drawerOpen, setDrawerOpen, editRecord, isEdit, fetchData } = props;

  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [submitEnable, setSubmitEnable] = useState(false);
  const [TowingDriverSelection, setTowingDriverSelection] = useState([]);

  const [form] = Form.useForm();
  const onClose = () => {
    setDrawerOpen(false);
    form.resetFields();
    setSubmitEnable(false);
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setSubmitLoading(true);
        console.log(isEdit, "isEdit");
        if (isEdit) {
          handleSubmitEdit();
        } else {
          handleSubmitNew();
        }
        setSubmitLoading(false);
      })

      .catch((info) => {
        setSubmitLoading(false);
        console.log("Validate Failed:", info);
      });
    setDrawerOpen(false);
  };

  const handleSubmitNew = async () => {
    const {
      condo_admin_id,
      towing_driver_id,
      condo_address,
      city,
      state,
      zip_code,
      max_cars,
    } = form.getFieldsValue();
    const record = {
      condo_admin_id,
      towing_driver_id:
        TowingDriverSelection.find((item) => item.label === towing_driver_id)
          ?.value ?? towing_driver_id,
      condo_address,
      city,
      state,
      zip_code,
      max_cars,
    };
    const res = await createCondo(record);
    if (res === "success") {
      fetchData();
    } else {
      console.log("error");
    }
  };

  const handleSubmitEdit = async () => {
    const {
      condo_admin_id,
      towing_driver_id,
      condo_address,
      city,
      state,
      zip_code,
      max_cars,
    } = form.getFieldsValue();
    const record = {
      condo_admin_id,
      towing_driver_id:
        TowingDriverSelection.find((item) => item.label === towing_driver_id)
          ?.value ?? towing_driver_id,
      condo_address,
      city,
      state,
      zip_code,
      max_cars,
    };
    const res = await updateCondo(editRecord.condo_id, record);
    if (res === "success") {
      fetchData();
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    if (drawerOpen) {
      const res = getUsersOptions();
      res.then((data) => {
        setTowingDriverSelection(data);
      });
    }
  }, [drawerOpen]);

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
          <Form
            form={form}
            layout="vertical"
            onValuesChange={(changedValues, allValues) => {
              setSubmitEnable(form.isFieldsTouched());
            }}
            requiredMark={false}
            defaultValue={{
              condo_id: 1,
              max_cars: 2,
            }}
          >
            <Row gutter={16} key={"1"}>
              <Col span={12}>
                <Form.Item name="condo_id" label="Condo ID">
                  <Input
                    defaultValue={1}
                    addonBefore="#"
                    placeholder="This will be auto generated"
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="condo_admin_id"
                  label="Condo Admin"
                  initialValue={1}
                >
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
                      type: "address",
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
                  initialValue={2}
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
                  onClick={onClose}
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
                  disabled={!submitEnable}
                  type="primary"
                  onClick={onSubmit}
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
