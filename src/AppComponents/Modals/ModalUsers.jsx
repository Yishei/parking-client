import React, { useEffect, useState, useContext } from "react";
import { MessageContext } from "../../Context/MessageContext";
import { FiEdit } from "react-icons/fi";
import {
  PhoneTwoTone,
  MailTwoTone,
  UserOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  InputNumber,
  Select,
  Switch,
  Space,
  Tooltip,
  Modal,
} from "antd";
import urls from "../../utilities/urls.json";
import { apiService } from "../../utilities/apiService";
const { confirm } = Modal;

const ModalUsers = (props) => {
  const { drawerOpen, setDrawerOpen, editRecord, isEdit, fetchData } = props;
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [userActive, setUserActive] = useState(false);
  const { msg } = useContext(MessageContext);
  const [form] = Form.useForm();

  const roleOptions = [
    { label: "User", value: 4 },
    { label: "Driver", value: 3 },
  ];
  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete this condo?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          This action cannot be undone, User is associated with:
          <br />
          {editRecord?.unit_count} Units.
          <br />
          All associated data will be deleted.
          <br />
        </div>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        //const res = await deleteUser(editRecord.user_id);
        const res = await apiService.delete(
          `${urls.baseURl}${urls.delete.deleteUser}${editRecord.user_id}`
        );
        if (res === "success") {
          msg("success", "Condo Deleted");
          setSubmitted(true);
          onClose();
        } else {
          msg("error", "Error Deleting Condo");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onClose = () => {
    setDrawerOpen(false);
    form.resetFields();
    setFormDisabled(true);
    setUserActive(false);
    setSubmitDisabled(true);
    if (submitted) {
      fetchData();
      setSubmitted(false);
    }
  };

  const onCansel = () => {
    console.log(form.getFieldsValue());
    if (isEdit) {
      editRecord ? form.setFieldsValue({ ...editRecord }) : form.resetFields();
      setUserActive(editRecord ? editRecord.is_active : false);
      setSubmitDisabled(true);
      setFormDisabled(true);
    } else {
      onClose();
    }
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setSubmitLoading(true);
        msg("loading", "Submitting Data");
        if (isEdit) {
          handleSubmitEdit();
        } else {
          handleSubmitNew();
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleSubmitNew = async () => {
    const record = getNeededFormValues();
    //const res = await createUser(record);
    const res = await apiService.post(
      `${urls.baseURl}${urls.post.createUser}`,
      record
    );
    setSubmitLoading(false);
    if (res !== "fail") {
      form.setFieldValue("user_id", res);
      setSubmitDisabled(true);
      setFormDisabled(true);
      setSubmitted(true);
      msg("success", "User Created Successfully");
    } else {
      msg("error", "Error Creating User");
    }
  };

  const handleSubmitEdit = async () => {
    const record = getNeededFormValues();
    //const res = await updateUser(editRecord.user_id, record);
    const res = await apiService.put(
      `${urls.baseURl}${urls.put.updateUser}${editRecord.user_id}`,
      record
    ); //`${urls.baseURl}${urls.put.updateUser}${editingId}`,
    setSubmitLoading(false);
    if (res === "success") {
      setSubmitDisabled(true);
      setFormDisabled(true);
      setSubmitted(true);
      msg("success", "User Updated Successfully");
    } else {
      msg("error", "Error Updating User");
    }
  };

  const getNeededFormValues = () => {
    const {
      email,
      phone_number_main,
      phone_number_2,
      user_role,
      username,
      is_active,
    } = form.getFieldsValue();
    return {
      email,
      phone_number_main,
      phone_number_2,
      user_role,
      username,
      is_active,
    };
  };

  const validatePhoneNumber = async (_, value) => {
    if (value && value.toString().length !== 11) {
      return Promise.reject("Phone Number should be 11 digits");
    }

    if (value) {
      let url = `${urls.baseURl}${urls.get.seeIfPhoneExists}?phone=${value}`;
      if (isEdit) {
        url += `&uptRcId=${editRecord.user_id}`;
      }

      const exists = await apiService.get(url);
      if (exists) {
        return Promise.reject(new Error("This Phone Number Already Exists"));
      }
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (!isEdit && drawerOpen) {
      setFormDisabled(false);
    }
  }, [isEdit, drawerOpen]);

  useEffect(() => {
    if (isEdit && drawerOpen) {
      form.setFieldsValue({ ...editRecord });
      setUserActive(editRecord.is_active);
    }
  }, [isEdit, drawerOpen, editRecord, form, setUserActive]);

  return (
    <>
      <Modal
        title="User Settings"
        onCancel={onClose}
        open={drawerOpen}
        width={750}
        confirmLoading={SubmitLoading}
        styles={{
          header: {
            height: "55px",
            display: "flex",
            justifyContent: "center",
          },
          footer: {
            padding: "10px 20px",
            display: "flex",
            justifyContent: "flex-end",
          },
        }}
        footer={
          !formDisabled ? (
            <Space>
              <Button
                onClick={onCansel}
                style={{
                  width: "100%",
                }}
              >
                Cancel
              </Button>
              <Button
                loading={SubmitLoading}
                disabled={submitDisabled}
                type="primary"
                onClick={onSubmit}
                style={{
                  width: "100%",
                }}
              >
                Submit
              </Button>
            </Space>
          ) : (
            <FiEdit
              color={"rgb(22, 119, 255)"}
              style={{ fontSize: "25px" }}
              className="edit-icon"
              onClick={() => {
                setFormDisabled(false);
              }}
            />
          )
        }
      >
        <Form
          form={form}
          disabled={formDisabled}
          layout="vertical"
          requiredMark={false}
          onValuesChange={(changedValues, allValues) => {
            setSubmitDisabled(false);
          }}
        >
          <Row gutter={16} key={"1"}>
            <Col span={12}>
              <Form.Item name="user_id" label="User ID">
                <Input
                  bordered={false}
                  placeholder="This will be auto generated"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="is_active" label="Is Active">
                <Switch
                  disabled={true}
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
                  bordered={!formDisabled}
                  addonBefore={!formDisabled ? <UserOutlined /> : null}
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
                  {
                    validator: async (_, value) => {
                      if (value) {
                        let url = `${urls.baseURl}${urls.get.seeIfEmailExists}?email=${value}`;
                        if (isEdit) {
                          url += `&uptRcId=${editRecord.user_id}`;
                        }
                        const exists = await apiService.get(url);
                        if (exists) {
                          return Promise.reject(
                            new Error("This Phone Number Already Exists")
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  bordered={!formDisabled}
                  addonBefore={!formDisabled ? <MailTwoTone /> : null}
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
                    validator: validatePhoneNumber,
                  },
                ]}
              >
                <InputNumber
                  bordered={!formDisabled}
                  addonBefore={!formDisabled ? <PhoneTwoTone /> : null}
                  controls={false}
                  style={{ width: "100%" }}
                  placeholder="Enter Phone Number"
                  formatter={(value) => {
                    const numbers = value.replace(/\D/g, "");
                    const match = numbers.match(
                      /^(\d{1})(\d{3})(\d{3})(\d{4})$/
                    );
                    if (match) {
                      return `${match[1]}-${match[2]}-${match[3]}-${match[4]}`;
                    }
                    return value;
                  }}
                  parser={(value) => value.replace(/-/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone_number_2"
                label="Phone Number (Secondary)"
                rules={[
                  {
                    validator: validatePhoneNumber,
                  },
                ]}
              >
                <InputNumber
                  bordered={!formDisabled}
                  addonBefore={!formDisabled ? <PhoneTwoTone /> : null}
                  controls={false}
                  style={{ width: "100%" }}
                  placeholder="Enter Phone Number"
                  formatter={(value) => {
                    const numbers = value.replace(/\D/g, "");
                    const match = numbers.match(
                      /^(\d{1})(\d{3})(\d{3})(\d{4})$/
                    );
                    if (match) {
                      return `${match[1]}-${match[2]}-${match[3]}-${match[4]}`;
                    }
                    return value;
                  }}
                  parser={(value) => value.replace(/-/g, "")}
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
                <Select
                  bordered={!formDisabled}
                  placeholder="select a role"
                  options={roleOptions}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {isEdit && (
          <Row gutter={16} key={"6"}>
            <Col span={24}>
              <Tooltip title="Delete Condo" color="red" placement="top">
                <Button
                  disabled={
                    editRecord.user_role === 1 || editRecord.user_role === 2
                  }
                  danger
                  style={{ width: "100%", marginTop: "10px" }}
                  icon={<DeleteOutlined />}
                  onClick={showConfirm}
                >
                  Delete
                </Button>
              </Tooltip>
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};
export default ModalUsers;
