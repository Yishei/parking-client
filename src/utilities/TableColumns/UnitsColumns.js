import { Space, Tooltip } from "antd";
import {
  DeleteTwoTone,
} from "@ant-design/icons";
import { TbListDetails } from "react-icons/tb";
import { PiHouseLight } from "react-icons/pi";

const UnitColumns = (handleDroawer) => {
  return [
    {
      render: () => <PiHouseLight style={{ fontSize: 25 }} />,
    },
    {
      title: "Unit Id",
      dataIndex: "unit_id",
      key: "unit_id",
    },
    {
      title: "Condo Id",
      dataIndex: "condo_id",
      key: "condo_id",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Resident Id",
      dataIndex: "user_id",
      key: "resident_id",
    },
    {
      title: "Resident Name",
      dataIndex: "username",
      key: "resident_name",
    },
    {
      title: "Max Occupancy",
      dataIndex: "max_cars",
      key: "max_cars",
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
              onClick={() => handleDroawer(record)}
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

export default UnitColumns;
