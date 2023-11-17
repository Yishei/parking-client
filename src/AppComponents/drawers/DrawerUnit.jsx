import { useEffect, useState, useContext } from "react";
import { MessageContext } from "../../Context/MessageContext";
import { NavLink, useParams } from "react-router-dom";
import {
  getUsersOptions,
  getCarsForUnit,
  getMaxCarsForCondo,
  updateUnit,
  createUnit,
} from "../../utilities/fetchData";
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
  Divider,
} from "antd";
import UnitCar from "../UnitCar";
import ModalCar from "../Modals/ModalCar";

const DrawerUnit = (props) => {
  const { drawerOpen, setDrawerOpen, editRecord, isEdit, fetchData } = props;
  // All States...
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // States for the Car Modal...
  const [carModalOpen, setCarModalOpen] = useState(false);
  const [isEditCar, setIsEditCar] = useState(false);
  const [car, setCar] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [residentSelections, setResidentSelections] = useState([]);
  const [carList, setCarList] = useState([]);
  const [maxCars, setMaxCars] = useState(2);
  const { msg } = useContext(MessageContext);
  const { condoId } = useParams();
  const [form] = Form.useForm();

  const fetchCars = async () => {
    const cars = await getCarsForUnit(editRecord.unit_id);
    console.log(cars, "cars");
    if (cars.length > 0) {
      setCarList(cars);
    } else {
      msg("error", "Error Getting Data");
    }
  };

  const onClose = () => {
    setDrawerOpen(false);
    form.resetFields();
    setFormDisabled(true);
    setSubmitDisabled(true);
    setCarList([]);
    setMaxCars(2);
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
      setMaxCars(editRecord?.max_cars);
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
    const res = await createUnit(record);
    setSubmitLoading(false);
    if (res !== "fail") {
      form.setFieldValue("unit_id", res);
      setSubmitDisabled(true);
      setFormDisabled(true);
      setSubmitted(true);
      msg("success", "Unit Created Successfully");
    } else {
      msg("error", "Something went wrong");
    }
  };

  const handleSubmitEdit = async () => {
    const record = getNeededFormValues();
    const res = await updateUnit(editRecord.unit_id, record);
    setSubmitLoading(false);
    if (res === "success") {
      setSubmitDisabled(true);
      setFormDisabled(true);
      setSubmitted(true);
      msg("success", "Unit Updated Successfully");
    } else {
      msg("error", "Something went wrong");
    }
  };

  const getNeededFormValues = () => {
    console.log(form.getFieldsValue(), "form.getFieldsValue()");
    const { max_cars, user_id, address } = form.getFieldsValue();
    return {
      condo_id: condoId,
      max_cars,
      user_id: user_id === undefined ? null : user_id,
      address,
    };
  };

  useEffect(() => {
    if (drawerOpen) {
      const users = getUsersOptions();
      users.then((data) => {
        setResidentSelections(data);
      });
    }
  }, [drawerOpen]);

  useEffect(() => {
    if (drawerOpen && !isEdit) {
      const max = getMaxCarsForCondo(condoId);
      max.then((data) => {
        setMaxCars(data);
        form.setFieldValue("max_cars", data);
      });
    } else if (drawerOpen && isEdit) {
      setMaxCars(editRecord?.max_cars);
    }
  }, [drawerOpen, condoId, form, isEdit, editRecord]);

  useEffect(() => {
    if (drawerOpen && !isEdit) {
      setFormDisabled(false);
    }
  }, [isEdit, drawerOpen]);

  useEffect(() => {
    if (isEdit && drawerOpen) {
      form.setFieldsValue({ ...editRecord });
    }
  }, [isEdit, editRecord, drawerOpen, form]);

  useEffect(() => {
    if (drawerOpen && isEdit) {
      const car = getCarsForUnit(editRecord.unit_id);
      car.then((data) => {
        console.log(data, "data");
        setCarList(data);
      });
    }
  }, [drawerOpen, isEdit, editRecord]);

  const handleMaxChange = (value) => {
    if (value < carList.length) {
      return;
    } else {
      setMaxCars(value);
    }
  };

  const handleOpneCarNew = () => {
    setIsEditCar(false);
    setUnitId(editRecord?.unit_id);
    setCar(null);
    setCarModalOpen(true);
  };

  const handleOpneCarEdit = (car) => {
    setIsEditCar(true);
    setUnitId(null);
    setCar(car);
    setCarModalOpen(true);
  };

  return (
    <>
      <ModalCar
        car={car}
        isEdit={isEditCar}
        open={carModalOpen}
        setOpen={setCarModalOpen}
        unitId={unitId}
        fetchCars={fetchCars}
      />
      <Drawer
        title="Unit Settings"
        width={500}
        open={drawerOpen}
        onClose={onClose}
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
                disabled={submitDisabled}
                loading={SubmitLoading}
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
        >
          <Row gutter={16} key={"1"}>
            <Col span={24}>
              <Form.Item name="unit_id" label="Unit ID">
                <Input
                  placeholder="This will be auto generated"
                  disabled
                  bordered={false}
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
                  bordered={!formDisabled}
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
                  {
                    validator: (_, value) =>
                      value >= carList.length
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              "Max cars can't be less than the current number of cars."
                            )
                          ),
                  },
                ]}
                initialValue={maxCars}
              >
                <InputNumber
                  bordered={!formDisabled}
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
                <Input
                  bordered={!formDisabled}
                  placeholder="Enter A Unit Inductor"
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left">Cars</Divider>
          <Row gutter={14} key={"5"}>
            <Col
              span={24}
              style={{
                display: "flex",
                justifyContent: "center", // Center the items horizontally
              }}
            >
              <Button
                type="primary"
                disabled={carList?.length >= maxCars || !formDisabled}
                style={{
                  width: "90%",
                  marginBottom: 10,
                }}
                onClick={handleOpneCarNew}
              >
                Add Car
              </Button>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {carList.map((car, index) => {
              return (
                <UnitCar
                  key={index}
                  car={car}
                  handleOpneCarEdit={handleOpneCarEdit}
                />
              );
            })}
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerUnit;
