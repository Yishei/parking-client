import React, { useState } from "react";
import { Button, Modal } from "antd";
import AddCar from "./addCar";
import "./carModel.css";

const CarModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        block
        style={{ backgroundColor: "#52c41a" }}
      >
        Add car
      </Button>
      <div className="model-container">
        <Modal
          width={800}
          className="add-car-model"
          title="Add Car"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <AddCar />
        </Modal>
      </div>
    </>
  );
};
export default CarModel;
