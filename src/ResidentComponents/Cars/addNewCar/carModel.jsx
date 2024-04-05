import React, { useState } from "react";
import { Button, Modal } from "antd";
import AddCar from "./addCar";
import cars from "../../database.json";

const CarModel = () => {
  const [data, setData] = useState(cars);
  const [maxCars, setMaxCars] = useState(4);
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
      {data.length < maxCars && (
        <Button
          type="primary"
          onClick={showModal}
          block
          style={{ backgroundColor: "#52c41a" }}
        >
          Add car
        </Button>
      )}
      <div className="model-container">
        <Modal
          styles={{
            header: {
              height: 50,
              padding: "10px",
            },
            body: {
              height: "auto",
              padding: "10px",
            },
          }}
          width={700}
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
