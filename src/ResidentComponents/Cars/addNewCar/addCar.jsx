import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import data from "../../database.json";
import "./addCar.css";

const AddCar = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    setInfo(data);
  }, []);

  return (
    <div className="add-car-container">
      {info.length >= 4 ? (
        <div className="max-cars-title">
          The total number of cars assigned to your account is:{" "}
          <span className="max-cars-data-1">{info.length}</span>
          <br />{" "}
          <div className="max-cars-data-2">
            You have reached the max of cars.
          </div>
        </div>
      ) : (
        <>
          <div className="kpi-section">
            <div className="kpi">
              <div className="kpi-title">
                Total cars allowed <div className="kpi-data">4</div>
              </div>
            </div>
            <div className="kpi">
              <div className="kpi-title">Total cars in your account</div>
              <div className="kpi-data">{info.length}</div>
            </div>
          </div>

          <div>
            <Form
              className="add-car-from"
              name="addCar"
              labelCol={{
                flex: "110px",
              }}
              labelAlign="left"
              labelWrap
              wrapperCol={{
                flex: 1,
              }}
              colon={false}
              style={{
                maxWidth: 700,
              }}
            >
              <div className="form-items">
                <Form.Item
                  label="Plate Number"
                  name="Plate_number"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Car Color"
                  name="car_color"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Car Make"
                  name="car_make"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Car Model"
                  name="car_model"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              <Form.Item label=" ">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-add-form-btn"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};
export default AddCar;
