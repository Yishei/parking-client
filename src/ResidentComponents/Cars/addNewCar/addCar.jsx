import React from "react";
import { Button, Form, Input } from "antd";
import "./addCar.css";

const AddCar = () => (
  <div className="add-car-container">
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
        maxWidth: 800,
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
);
export default AddCar;
