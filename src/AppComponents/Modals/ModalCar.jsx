import { Modal, Form, Button, Input } from "antd";
import {
  CarTwoTone,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState, useContext } from "react";
import { MessageContext } from "../../Context/MessageContext";
import urls from "../../utilities/urls.json";
import { apiService } from "../../utilities/apiService";

const ModalCar = (props) => {
  const { car, open, setOpen, unitId, isEdit, fetchCars } = props;
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [sumbitLoading, setSubmitLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const { msg } = useContext(MessageContext);
  const [form] = Form.useForm();
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: "Do you Want to delete this Car?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          This action cannot be undone:
          <br />
          All associated data will be deleted.
          <br />
        </div>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        //const res = await deleteCar(car.car_id);
        msg("loading", "Deleting Car...");
        const res = await apiService.delete(
          `${urls.baseURl}${urls.delete.deleteCar}${car.car_id}`
        );
        console.log(res, "res");
        if (res === "success") {
          msg("success", "Car Deleted");
          setSubmitted(true);
        } else {
          msg("error", "Error Deleting Car");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const onClose = async () => {
    setOpen(false);
    form.resetFields();
    setFormDisabled(true);
    setSubmitDisabled(true);
    if (submitted) {
      console.log("submitted and closed");
      fetchCars();
      setSubmitted(false);
    }
  };

  const onCansel = () => {
    if (isEdit) {
      car ? form.setFieldsValue({ ...car }) : form.resetFields();
      setSubmitDisabled(true);
      setFormDisabled(true);
    } else {
      onClose();
    }
  };

  const onSubmit = async () => {
    form
      .validateFields()
      .then((values) => {
        setSubmitLoading(true);
        msg("loading", "Saving car details...");
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
    const record = form.getFieldsValue();
    record.plate_number = record.plate_number.toLowerCase();
    record.unit_id = unitId;
    //const res = await createCar(record);
    const res = await apiService.post(
      `${urls.baseURl}${urls.post.createCar}`,
      record
    );
    setSubmitLoading(false);
    if (res !== "fail") {
      setFormDisabled(true);
      setSubmitDisabled(true);
      setSubmitted(true);
      msg("success", "Car details saved successfully!");
    } else {
      msg("error", "Something went wrong!");
    }
  };

  const handleSubmitEdit = async () => {
    const record = form.getFieldsValue();
    record.plate_number = record.plate_number.toLowerCase();
    //const res = await updateCar(car.car_id, record);
    const res = await apiService.put(
      `${urls.baseURl}${urls.put.updateCar}${car.car_id}`,
      record
    ); //`${urls.baseURl}${urls.put.updateCar}${car.car_id}
    setSubmitLoading(false);
    if (res === "success") {
      setSubmitDisabled(true);
      setFormDisabled(true);
      setSubmitted(true);
      msg("success", "Car details updated successfully!");
    } else {
      msg("error", "Something went wrong!");
    }
  };

  useEffect(() => {
    if (!isEdit && open) {
      setFormDisabled(false);
    }
  }, [isEdit, open]);

  useEffect(() => {
    if (isEdit && open) {
      form.setFieldsValue({ ...car });
    }
  }, [isEdit, open, car, form]);

  return (
    <>
      <Modal
        title="Car Details"
        open={open}
        className="car-modal"
        onCancel={onClose}
        footer={
          !formDisabled ? (
            <>
              <Button
                type="primary"
                onClick={onSubmit}
                loading={sumbitLoading}
                disabled={submitDisabled}
              >
                Submit
              </Button>
              <Button onClick={onCansel}>Cancel</Button>
            </>
          ) : (
            <>
              <FiEdit
                color={"rgb(22, 119, 255)"}
                style={{ fontSize: "20px" }}
                className="edit-icon"
                onClick={() => {
                  if (car.locked) {
                    msg("info", "Car details cannot be edited while locked");
                  } else {
                    setFormDisabled(false);
                  }
                }}
              />
            </>
          )
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              flex: 1,
            }}
          >
            {!isEdit || !car.has_pic ? (
              <CarTwoTone
                style={{ fontSize: 130, marginLeft: 20, marginRight: 20 }}
              />
            ) : (
              <img
                alt="example"
                src={`http://localhost:5050/api/image/unit/car/${car.car_id}?w=175&h=130`}
                style={{
                  borderRadius: 5,
                }}
              />
            )}
            {isEdit && (
              <div>
                <Button
                  danger
                  style={{ width: "75%", marginTop: "10px" }}
                  icon={<DeleteOutlined />}
                  onClick={showConfirm}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div
            style={{
              flex: 1,
            }}
          >
            <Form
              form={form}
              layout="vertical"
              name="basic"
              disabled={formDisabled}
              requiredMark={false}
              onValuesChange={(changedValues, allValues) => {
                setSubmitDisabled(false);
              }}
            >
              <Form.Item
                label="Car Make"
                name="car_make"
                rules={[
                  {
                    required: true,
                    message: "input your Car Make!",
                  },
                ]}
              >
                <Input placeholder="Enter car make" bordered={!formDisabled} />
              </Form.Item>
              <Form.Item
                label="Car Model"
                name="car_model"
                rules={[
                  {
                    required: true,
                    message: "input your Car Model!",
                  },
                ]}
              >
                <Input placeholder="Enter car model" bordered={!formDisabled} />
              </Form.Item>
              <Form.Item
                label="Plate Number"
                name="plate_number"
                rules={[
                  {
                    required: true,
                    message: "input your plate number!",
                  },
                  {
                    validator: async (_, value) => {
                      if (value) {
                        const locked = await apiService.get(
                          `${urls.baseURl}${urls.get.seeIfCarIsLocked}${value}`
                        );
                        if (locked) {
                          return Promise.reject(
                            new Error("This Car is Locked")
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Enter plate number"
                  bordered={!formDisabled}
                />
              </Form.Item>
              <Form.Item
                label="Car Color"
                name="car_color"
                rules={[
                  {
                    required: true,
                    message: "input your Car Color!",
                  },
                ]}
              >
                <Input placeholder="Enter car color" bordered={!formDisabled} />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalCar;
