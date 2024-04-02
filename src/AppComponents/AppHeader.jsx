import { useContext } from "react";
import { Button, Select } from "antd";
import HeadPopover from "./HeadPopover/HeadPopover";
import AppContext from "../Context/AppContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import AddressSelect from "../ResidentComponents/AddressSelect/AddressSelect";
import { addressList } from "../ResidentComponents/data/addressList";

const AppHeader = () => {
  const AddressList = addressList.map((address) => {
    return {
      label: <AddressSelect address={address} />,
      value: address.id,
    };
  });

  const { isMenuOpen, setIsMenuOpen } = useContext(AppContext);
  return (
    <div className="app-header">
      <div className="col-btn-container">
        <Button
          type="text"
          icon={!isMenuOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="col-btn"
        />
        <div className="welcome">
          <div className="welcome-data">Welcome, Joel</div>
        </div>
      </div>
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

export default AppHeader;
