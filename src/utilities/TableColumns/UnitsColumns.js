import { Space, Tooltip, Modal } from "antd";
import { DeleteTwoTone, ExclamationCircleOutlined } from "@ant-design/icons";
import { TbListDetails } from "react-icons/tb";
import { PiHouseLight } from "react-icons/pi";

const UnitColumns = (handleDroawer, handleDelete) => {
  const { confirm } = Modal;

  const showConfirm = (record) => {
    confirm({
      title: "Do you Want to delete this condo?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          This action cannot be undone this condo has: All associated data will
          be deleted.
          <br />
        </div>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await handleDelete(record);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return [
    {
      render: () => <PiHouseLight style={{ fontSize: 25 }} />,
      width: "5%",
    },
    {
      title: "Id",
      dataIndex: "unit_id",
      key: "unit_id",
      width: "10%",
      sorter: (a, b) => a.unit_id - b.unit_id,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "20%",
    },

    {
      title: "Resident Id",
      dataIndex: "user_id",
      key: "resident_id",
      width: "15%",
      sorter: (a, b) => a.user_id - b.user_id,
    },
    {
      title: "Resident Name",
      dataIndex: "username",
      key: "resident_name",
      width: "15%",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Max Occupancy",
      dataIndex: "max_cars",
      key: "max_cars",
      width: "10%",
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
          {/* <Tooltip title="Details" color="#52c41a" placement="top"> */}
            <TbListDetails
              color={"rgb(22, 119, 255)"}
              style={{ fontSize: "17px" }}
              onClick={() => handleDroawer(record)}
              className="edit-icon"
            />
          {/* </Tooltip>
          <Tooltip title="Delete" color="red" placement="top"> */}
            <DeleteTwoTone
              twoToneColor={"#eb2f96"}
              style={{ fontSize: "17px" }}
              onClick={() => showConfirm(record)}
              className="edit-icon"
            />
          {/* </Tooltip> */}
        </Space>
      ),
    },
  ];
};

export default UnitColumns;
