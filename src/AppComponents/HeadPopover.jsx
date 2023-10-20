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
    <div className="app-head-popover-div">
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
            title={<NavLink to="/login">Logout</NavLink>}
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
      <Avatar size={45} icon={<UserOutlined />} className="user-Avatar" />
    </Popover>
  );
};

export default HeadPopover;
