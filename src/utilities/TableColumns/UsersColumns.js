import { FaUser } from "react-icons/fa";

const UserColumns = () => {
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
      sorter: (a, b) => a.user_id - b.user_id,
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
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
      render: (text) => {
        if (text === 1) return "Super Admin";
        if (text === 2) return "Condo Admin";
        if (text === 3) return "Towing Driver";
        if (text === 4) return "User";
      },
      sorter: (a, b) => a.user_role - b.user_role,
    },
    {
      title: "Is Active",
      dataIndex: "is_active",
      render: (text) => <span>{text ? "Yes" : "No"}</span>,
      key: "is_active",
      sorter: (a, b) => a.is_active - b.is_active,
    },
    {
      title: "Unit Count",
      dataIndex: "unit_count",
      key: "unit_count",
      sorter: (a, b) => a.unit_count - b.unit_count,
    },
  ];
};

export default UserColumns;
