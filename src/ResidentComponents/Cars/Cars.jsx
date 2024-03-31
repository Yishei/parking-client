import { Card } from "antd";
import data from "./database.json";
import React, { useState, useEffect } from "react";
import Meta from "antd/es/card/Meta";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import carImage from "./images/exterior-640-en_US.webp";
import "./Cars.css";
import CarModel from "./addNewCar/carModel";

const Cars = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    setInfo(data);
  }, []);

  return (
    <div className="car-info-container">
      <div className="inner-container">
        {info.map((item, index) => (
          <div key={index} className="info-card-container">
            <Card
              title={`Car #${index + 1}`}
              bordered={false}
              style={{
                width: 300,
              }}
              cover={<img alt="example" src={carImage} />}
              actions={[
                <EditTwoTone key="edit" />,
                <DeleteTwoTone key="ellipsis" />,
              ]}
            >
              <Meta
                description={
                  <div>
                    <div className="data-section">
                      <div className="data-title">Plate Number:</div>
                      <div className="data-info">{item.plate_number}</div>
                    </div>
                    <div className="data-section">
                      <div className="data-title">Car Color:</div>
                      <div className="data-info">{item.car_color}</div>
                    </div>
                    <div className="data-section">
                      <div className="data-title">Car Make:</div>
                      <div className="data-info">{item.car_make}</div>
                    </div>
                    <div className="data-section">
                      <div className="data-title">Car Model:</div>
                      <div className="data-info">{item.car_model}</div>
                    </div>
                  </div>
                }
              />
            </Card>
          </div>
        ))}
        <div className="action-section">
          <div className="add-car">
            <CarModel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cars;
