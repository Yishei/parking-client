import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CustomLoadingIndecator from "../CustomLoadingIndecator";
import {
  getCondosOptions,
  getUsersOptions,
  updateUnit,
} from "../../utilities/fetchData";
import { CarTwoTone } from "@ant-design/icons";
import { FiEdit } from "react-icons/fi";
import {
  Drawer,
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  Button,
  Space,
  Tooltip,
} from "antd";

const DrawerUnit = (props) => {
  const { setDrawerOpen, editRecord, isEdit, fetchData } = props;
  // All States...
  const [formEnable, setFormEnable] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [condoSelections, setCondoSelections] = useState([]);
  const [residentSelections, setResidentSelections] = useState([]);
  const [carList, setCarList] = useState([]);
  const [maxCars, setMaxCars] = useState(2);
  const [form] = Form.useForm();

  // this should set the carList and maxCars state for the edit record
  const handleSetCarsAndMaxCarsForEdit = useCallback(() => {
    const carList = JSON.parse(editRecord.car_list).list;
    setCarList(carList);
    setMaxCars(editRecord.max_cars);
  }, [editRecord]);

  // this should set the form values for the edit record
  const setFormValuesEdit = useCallback(() => {
    const { unit_id, condo_id, user_id, max_cars, address } = editRecord;
    form.setFieldsValue({
      unit_id,
      condo_id,
      user_id,
      max_cars,
      address,
    });
  }, [editRecord, form]);

  // this should handle the submit button
  const handleSubmit = async () => {
    form
      .validateFields()
      .then((values) => {
        if (isEdit) {
          handleEditSubmit();
        } else {
          // handle the new submit
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
    setFormEnable(false);
  };

  const handleNewSubmit = async () => {
    // handle the new submit
  };

  const handleEditSubmit = async () => {
    const res = await updateUnit(editRecord.unit_id, form.getFieldsValue());
    if (res === "success") {
      fetchData(editRecord.condo_id);
    } else {
      console.log("error");
    }
  };

  // this should handle the cancel button
  const handleCancel = () => {
    if (isEdit) {
      handleSetCarsAndMaxCarsForEdit();
      setFormValuesEdit();
      setFormEnable(false);
    } else {
      handleClose();
    }
  };

  // this should handle the closing of the drawer
  const handleClose = async () => {
    setDrawerOpen(false);
  };

  // Set the default values for carList and maxCars state
  // And set the form values for the drawer
  // if the drawer is open and the isEdit prop is true

  useEffect(() => {
    if (isEdit) {
      handleSetCarsAndMaxCarsForEdit();
      setFormValuesEdit();
    }
  }, [isEdit, handleSetCarsAndMaxCarsForEdit, setFormValuesEdit]);

  // get the selection options for the condo and resident
  // and set the condoSelections and residentSelections state
  useEffect(() => {
    getCondosOptions().then((res) => {
      setCondoSelections(res);
    });
    getUsersOptions().then((res) => {
      setResidentSelections(res);
    });
  }, []);

  // handles the change for the form input max_cars
  // to add or remove cars from the carList state and reflect on the form items
  const handleMaxChange = (value) => {
    setMaxCars(value);
    if (value < carList.length) {
      setCarList(carList.slice(0, value));
    } else if (value > carList.length) {
      setCarList([
        ...carList,
        ...Array.from({ length: value - carList.length }),
      ]);
    }
  };

  return (
    <Drawer
      title="Unit Settings"
      width={500}
      onClose={handleClose}
      open={true}
      className="unit-drawer"
      styles={{
        header: {
          backgroundColor: "#f0f2f5",
        },
        body: {
          border: "2px solid #f0f2f5",
        },
      }}
      extra={
        formEnable ? (
          <Space>
            <Button
              onClick={handleCancel}
              style={{
                width: "100%",
              }}
            >
              Cancel
            </Button>
            <Button
              loading={submitLoading}
              type="primary"
              onClick={handleSubmit}
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
                setFormEnable(true);
              }}
            />
          </Tooltip>
        )
      }
    >
      <CustomLoadingIndecator loading={submitLoading}>
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
                  options={condoSelections}
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
                  options={residentSelections}
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
                initialValue={maxCars}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  placeholder="Enter Max Cars"
                  min={1}
                  max={5}
                  onChange={(value) => {
                    handleMaxChange(value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} key={"4"}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter the address",
                  },
                ]}
              >
                <Input placeholder="Enter A Unit Inductor" />
              </Form.Item>
            </Col>
          </Row>
          {carList.map((car, index) => (
            <Row gutter={16} key={index + 5}>
              <Col span={24}>
                <Form.Item
                  name={`car_list[${index}]`}
                  label={`Car ${index + 1}`}
                  initialValue={car}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    addonBefore={<CarTwoTone />}
                    placeholder={`Enter Car ${index + 1}`}
                    maxLength={10}
                    onChange={(event) => {
                      const newCarList = [...carList];
                      newCarList[index] = event.target.value;
                      setCarList(newCarList);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          ))}
          {Array.from({ length: maxCars - carList.length }, (_, i) => (
            <Row gutter={16} key={i}>
              <Col span={24}>
                <Form.Item
                  name={`car_list[${carList.length + i}]`}
                  label={`Car ${carList.length + i + 1}`}
                >
                  <Input
                    style={{
                      width: "100%",
                    }}
                    addonBefore={<CarTwoTone />}
                    placeholder={`Enter Car ${carList.length + i + 1}`}
                    maxLength={10}
                    onChange={(event) => {
                      const newCarList = [...carList];
                      newCarList[carList.length + i] = event.target.value;
                      setCarList(newCarList);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          ))}
        </Form>
      </CustomLoadingIndecator>
    </Drawer>
  );
};

export default DrawerUnit;
