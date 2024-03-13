import { useContext } from "react";

import { Button, Select } from "antd";
import HeadPopover from "./HeadPopover/HeadPopover";
import AppContext from "../Context/AppContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import AddressSelect from "../ResidentComponents/AddressSelect";
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
          dropdownRender={(menu) => (
            <div>
              {menu}
              <div className="add-address-bottom">
                <Button type="primary">Add Address</Button>
              </div>
            </div>
          )}
          defaultValue={AddressList[0].value}
          options={AddressList}
        />
        <HeadPopover />
      </div>
    </div>
  );
};

export default AppHeader;
