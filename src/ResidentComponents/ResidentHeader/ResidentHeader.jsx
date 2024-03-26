import "./ResidentHeader.css";
import { Button, Select } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";
import AddressSelect from "../AddressSelect/AddressSelect";
import HeadPopover from "../../AppComponents/HeadPopover/HeadPopover";
import { addressList } from "../data/addressList";
const ResidentHeader = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);

  const AddressList = addressList.map((address) => {
    return {
      label: <AddressSelect address={address} />,
      value: address.id,
    };
  });

  return (
    <div className="app-header">
      <Button
        type="text"
        icon={!isMenuOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          fontSize: "18px",
          background: "transparent",
        }}
      />
      <div className="app-header-right">
        <Select
          suffixIcon=""
          defaultValue={AddressList[0].value}
          options={AddressList}
        />
        <HeadPopover />
      </div>
    </div>
  );
};

export default ResidentHeader;
