import { PiHouseLight } from "react-icons/pi";

const UnitColumns = () => {
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
  ];
};

export default UnitColumns;
