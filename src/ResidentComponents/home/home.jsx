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
      {info.map((item) => (
        <div>
          <Card title="User Details">
            <Card.Grid>
              <div>Name:</div>
              <div>{item.name}</div>
            </Card.Grid>
            <Card.Grid>
              <div>Address:</div>
              <div>{item.address}</div>
            </Card.Grid>
            <Card.Grid>
              <div>City:</div>
              <div>{item.city}</div>
            </Card.Grid>
            <Card.Grid>
              <div>State:</div>
              <div>{item.state}</div>
            </Card.Grid>
            <Card.Grid>
              <div>Zip Code:</div>
              <div>{item.zip_code}</div>
            </Card.Grid>
            <Card.Grid>
              <div>Plate Number:</div>
              <div>{item.plate_number}</div>
            </Card.Grid>
            <Card.Grid>
              <div>Car Color:</div>
              <div>{item.car_color}</div>
            </Card.Grid>
            <Card.Grid>
              <div>Car Make:</div>
              <div>{item.car_make}</div>
            </Card.Grid>
            <Card.Grid>
              <div>Car Model:</div>
              <div>{item.car_model}</div>
            </Card.Grid>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Home;
