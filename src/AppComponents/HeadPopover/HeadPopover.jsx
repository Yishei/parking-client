import "./HeadPopover.css";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { List, Popover, Avatar } from "antd";

const HeadPopover = () => {
  const [open, setOpen] = useState(false);
  const handleVisibleChange = (newOpen) => {
    setOpen(newOpen);
  };

  const content = (
    <div className="popover-container">
      <div className="popover-top-container">
        <div className="popover-top-container-avatar">
          <Avatar size={45} icon={<UserOutlined />} className="user-Avatar" />
        </div>
        <div className="popover-top-container-title" style={{ textAlign: "center", width: "100%" }}>
          Yishei Jacobowitz
        </div>
      </div>

      <List size="small">
        <List.Item>
          <List.Item.Meta
            avatar={<UserOutlined />}
            title={<NavLink to="/profile">Profile</NavLink>}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<SettingOutlined />}
            title={<NavLink to="/settings">Settings</NavLink>}
          />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            avatar={<LogoutOutlined />}
            title={<NavLink to="/logIn">Logout</NavLink>}
          />
        </List.Item>
      </List>
    </div>
  );

  return (
    <Popover
      placement="bottomRight"
      trigger="hover"
      open={open}
      onOpenChange={handleVisibleChange}
      content={content}
    >
      <div className="user-Avatar">YJ</div>
    </Popover>
  );
};

export default HeadPopover;
