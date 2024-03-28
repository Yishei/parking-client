import { LiaMapMarkerAltSolid } from "react-icons/lia";
import "./AddressSelect.css";

const AddressSelect = ({ address }) => {
  console.log(address);
  return (
    <div className="address-indicator">
      <div className="address-indicator-title">
        <b>
          {address.address} #{address.unitNumber}
        </b>
        <br />
        {String(address.city).toLocaleUpperCase()},{" "}
        {String(address.state).toLocaleUpperCase()} {address.zipCode}
      </div>
      <div>
        <LiaMapMarkerAltSolid style={{ fontSize: "30" }} />
      </div>
    </div>
  );
};

export default AddressSelect;
