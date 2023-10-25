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
import CustomLoadingIndecator from "../CustomLoadingIndecator";
import { updateUser } from "../../utilities/fetchData";

const DrawerUser = (props) => {
  const { drawerOpen, editRecord, isEdit, cancelDrawer, fetchData } = props;

  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [formEnable, setFormEnable] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const [form] = Form.useForm();

  const onClose = () => {
    cancelDrawer();
    setFormEnable(false);
    form.resetFields();
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setSubmitLoading(true);
        if (isEdit) {
          handleSubmitEdit();
        } else {
          handleSubmitNew();
        }
        setSubmitLoading(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleSubmitEdit = async () => {
    console.log(form.getFieldsValue());
    const {
      is_active,
      username,
      email,
      phone_number_main,
      phone_number_2,
      user_role,
    } = form.getFieldsValue();
    const record = {
      is_active,
      username,
      email,
      phone_number_main,
      phone_number_2,
      user_role,
    };
    const res = await updateUser(editRecord.user_id, record);
    if (res === "success") {
      fetchData();
      onClose();
    }

    return;
  };

  const handleSubmitNew = async () => {
    return;
  };

  useEffect(() => {
    if (isEdit && drawerOpen) {
      form.setFieldsValue(editRecord);
      setUserActive(editRecord.is_active);
    }
  }, [isEdit, drawerOpen, editRecord, form, setUserActive]);

  return (
    <>
      <Drawer
        title="User Settings"
        width={560}
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
                    checked={userActive}
                    onChange={(checked) => {
                      setUserActive(checked);
                    }}
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
                    minLength={11}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone_number_2"
                  label="Phone Number (Secondary)"
                  rules={[
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
                    minLength={11}
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
                  <Select defaultValue="User">
                    <Select.Option value="Condo_admin">
                      Condo Admin
                    </Select.Option>
                    <Select.Option value="User">User</Select.Option>
                    <Select.Option value="Towing_driver">Driver</Select.Option>
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
                      onClick={onSubmit}
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
