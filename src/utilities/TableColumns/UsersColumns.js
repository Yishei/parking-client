import { Space, Tooltip } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { TbListDetails } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

const UserColumns = (handleSettingsOpen) => {
  return [
    {
      render: (_, record) => (
        <FaUser
          color={record.is_active ? "rgb(82, 196, 26)" : "red"}
          style={{ fontSize: 25 }}
        />
      ),
    },
    {
      title: "User Id",
      dataIndex: "user_id",
      key: "User_id",
    },
    {
      title: "Condo Id",
      dataIndex: "condo_id",
      key: "condo_id",
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number (Main)",
      dataIndex: "phone_number_main",
      key: "phone_number_main",
      render: (text) => {
        return text.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "1-$2-$3-$4");
      },
    },
    {
      title: "User Role",
      dataIndex: "user_role",
      key: "user_role",
    },
    {
      title: "Is Active",
      dataIndex: "is_active",
      render: (text) => <span>{text ? "Yes" : "No"}</span>,
      key: "is_active",
    },
    {
      title: "Unit Count",
      dataIndex: "unit_count",
      key: "unit_count",
    },
    {
      title: "More",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space
          size="middle"
          style={{ justifyContent: "center", width: "100%" }}
        >
          <Tooltip title="Details" color="#52c41a" placement="top">
            <TbListDetails
              color={"rgb(22, 119, 255)"}
              style={{ fontSize: "17px" }}
              onClick={() => handleSettingsOpen(record)}
              className="edit-icon"
            />
          </Tooltip>
          <Tooltip title="Delete" color="red" placement="top">
            <DeleteTwoTone
              twoToneColor={"#eb2f96"}
              style={{ fontSize: "17px" }}
              onClick={() => alert("delete is not implemented yet")}
              className="edit-icon"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
};

export default UserColumns;
