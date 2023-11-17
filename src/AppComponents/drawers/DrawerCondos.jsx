import React, { useEffect, useState, useContext } from "react";
import { MessageContext } from "../../Context/MessageContext";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { FiEdit } from "react-icons/fi";
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
  Space,
  Tooltip,
  Modal,
} from "antd";
import {
  createCondo,
  getUsersOptions,
  updateCondo,
  deleteCondo,
} from "../../utilities/fetchData";

const DrawerCondos = (props) => {
  const { drawerOpen, setDrawerOpen, editRecord, isEdit, fetchData } = props;
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [TowingDriverSelection, setTowingDriverSelection] = useState([]);
  const { msg } = useContext(MessageContext);
  const [form] = Form.useForm();
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete this condo?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          This action cannot be undone this condo has:
          <br />
          {editRecord?.lot_count} Lots.
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
        const res = await deleteCondo(editRecord.condo_id);
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
    setSubmitDisabled(true);
    if (submitted) {
      fetchData();
      setSubmitted(false);
    }
  };

  const onCansel = () => {
    if (isEdit) {
      editRecord ? form.setFieldsValue({ ...editRecord }) : form.resetFields();
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
    const res = await createCondo(record);
    setSubmitLoading(false);
    if (res !== "fail") {
      form.setFieldValue("condo_id", res);
      setSubmitDisabled(true);
      setFormDisabled(true);
      setSubmitted(true);
      msg("success", "New Condo Created");
    } else {
      msg("error", "Error Creating New Condo");
    }
  };

  const handleSubmitEdit = async () => {
    const record = getNeededFormValues();
    const res = await updateCondo(editRecord.condo_id, record);
    setSubmitLoading(false);
    if (res === "success") {
      setSubmitDisabled(true);
      setFormDisabled(true);
      setSubmitted(true);
      msg("success", "Condo Updated");
    } else {
      msg("error", "Error Updating Condo");
    }
  };

  const getNeededFormValues = () => {
    const {
      condo_admin_id,
      towing_driver_id,
      condo_address,
      city,
      state,
      zip_code,
      max_cars,
    } = form.getFieldsValue();
    return {
      condo_admin_id,
      towing_driver_id,
      condo_address,
      city,
      state,
      zip_code,
      max_cars,
    };
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
    if (!isEdit && drawerOpen) {
      setFormDisabled(false);
    }
  }, [isEdit, drawerOpen]);

  useEffect(() => {
    if (isEdit && drawerOpen) {
      form.setFieldsValue({ ...editRecord });
    }
  }, [isEdit, drawerOpen, editRecord, form]);

  return (
    <>
      <Drawer
        title="Condo Settings"
        width={500}
        onClose={onClose}
        open={drawerOpen}
        styles={{
          header: {
            backgroundColor: "#f0f2f5",
          },
          body: {
            marginTop: 20,
          },
        }}
        extra={
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
                onClick={onSubmit}
                loading={SubmitLoading}
                disabled={submitDisabled}
                type="primary"
                style={{
                  width: "100%",
                }}
              >
                Submit
              </Button>
            </Space>
          ) : (
            <Tooltip title="Edit" color="#52c41a" placement="left">
              <FiEdit
                color={"rgb(22, 119, 255)"}
                style={{ fontSize: "20px" }}
                className="edit-icon"
                onClick={() => {
                  setFormDisabled(false);
                }}
              />
            </Tooltip>
          )
        }
      >
        <Form
          form={form}
          layout="vertical"
          disabled={formDisabled}
          requiredMark={false}
          onValuesChange={(changedValues, allValues) => {
            setSubmitDisabled(false);
          }}
          defaultValue={{
            condo_id: 1,
            max_cars: 2,
          }}
        >
          <Row gutter={16} key={"1"}>
            <Col span={12}>
              <Form.Item name="condo_id" label="Condo ID">
                <Input
                  bordered={false}
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
                  bordered={false}
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
                  bordered={!formDisabled}
                  options={TowingDriverSelection}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
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
                  bordered={!formDisabled}
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
                  bordered={!formDisabled}
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
                  bordered={!formDisabled}
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
                  bordered={!formDisabled}
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
                  bordered={!formDisabled}
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
        {isEdit && (
          <Row gutter={16} key={"6"}>
            <Col span={24}>
              <Tooltip title="Delete Condo" color="red" placement="top">
                <Button
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
      </Drawer>
    </>
  );
};
export default DrawerCondos;
