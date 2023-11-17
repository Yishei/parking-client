import { CarTwoTone } from "@ant-design/icons";

const UnitCar = ({ car, handleOpneCarEdit }) => {
  return (
    <>
      <div
        className="image-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "175px",
          height: "175px",
          marginBottom: 10,
          border: "none",
          borderRadius: 5,
          backgroundColor: "#f0f2f5",
        }}
        onClick={() => {
          handleOpneCarEdit(car);
        }}
      >
        {!car.has_pic ? (
          <CarTwoTone
            style={{ fontSize: 130, marginLeft: 20, marginRight: 20 }}
          />
        ) : (
          <img
            alt="example"
            src={`http://localhost:5050/condoAdmin/image/unit/car/${car.car_id}?w=175&h=130`}
            style={{
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: 15, fontWeight: "bold" }}>{car.car_make}</h1>
        </div>
      </div>
    </>
  );
};

export default UnitCar;
