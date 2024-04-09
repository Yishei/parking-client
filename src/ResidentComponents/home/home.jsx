import React, { useEffect, useState } from "react";
import data from "../database.json";
import { Card } from "antd";
import "./home.css";

const Home = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    setInfo(data);
  }, []);

  return (
    <div className="home-main-container">
      {info.map((item, index) => (
        <div key={index} className="inner-home-container">
          <Card title="User Details" className="card-container">
            <Card.Grid>
              <div className="data-container">
                <div className="data-title">Name:</div>
                <div>{item.name}</div>
              </div>
            </Card.Grid>
            <Card.Grid>
              <div className="data-container">
                <div className="data-title">Address:</div>
                <div>{item.address}</div>
              </div>
            </Card.Grid>
            <Card.Grid>
              <div className="data-container">
                <div className="data-title">City:</div>
                <div>{item.city}</div>
              </div>
            </Card.Grid>
            <Card.Grid>
              <div className="data-container">
                <div className="data-title">State:</div>
                <div>{item.state}</div>
              </div>
            </Card.Grid>
            <Card.Grid>
              <div className="data-container">
                <div className="data-title">Zip Code:</div>
                <div>{item.zip_code}</div>
              </div>
            </Card.Grid>
            <Card.Grid>
              <div className="data-container">
                <div className="data-title">Plate Number:</div>
                <div>{item.plate_number}</div>
              </div>
            </Card.Grid>
            <Card.Grid>
              <div className="data-container">
                <div className="data-title">Car Color:</div>
                <div>{item.car_color}</div>
              </div>
            </Card.Grid>
            <Card.Grid>
              <div className="data-container">
                <div className="data-title">Car Make:</div>
                <div>{item.car_make}</div>
              </div>
            </Card.Grid>
            <Card.Grid>
              <div className="data-container">
                <div className="data-title">Car Model:</div>
                <div>{item.car_model}</div>
              </div>
            </Card.Grid>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Home;
