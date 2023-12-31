import { Space, Tooltip } from "antd";
import {
  SettingTwoTone,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BsBuildingsFill } from "react-icons/bs";
import { RiCommunityLine } from "react-icons/ri";
import { FaWarehouse } from "react-icons/fa";

const CondoColumns = (handleDroawer) => {
  const navigate = useNavigate();
  return [
    {
      render: () => <BsBuildingsFill style={{ fontSize: 25 }} />,
      width: 5,
    },
    {
      title: "condo ID",
      dataIndex: "condo_id",
      key: "condo_id",
      width: 10,
      sorter: (a, b) => a.condo_id - b.condo_id,
    },
    {
      title: "Address",
      dataIndex: "condo_address",
      key: "address",
      width: 20,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 10,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      width: 10,
    },
    {
      title: "Lot Count",
      dataIndex: "lot_count",
      key: "lot_count",
      width: 10,
      sorter: (a, b) => a.lot_count - b.lot_count,
    },
    {
      title: "Unit Count",
      dataIndex: "unit_count",
      key: "resident_count",
      width: 10,
      sorter: (a, b) => a.unit_count - b.unit_count,
    },
    {
      title: "More",
      key: "action",
      width: 15,
      render: (_, record) => (
        <>
          <Space
            size="middle"
            style={{ justifyContent: "center", width: "100%" }}
          >
            {/* <Tooltip title="Lots" color="#52c41a" placement="top"> */}
              <FaWarehouse
                color={"rgb(22, 119, 255)"}
                style={{ fontSize: "17px", marginRight: 5 }}
                onClick={() => {
                  navigate(`/admin/lots/${record.condo_id}`);
                }}
                className="lot-icon"
              />
            {/* </Tooltip>
            <Tooltip title="Units" color="#52c41a" placement="top"> */}
              <RiCommunityLine
                color={"rgb(22, 119, 255)"}
                style={{ fontSize: "20px", margin: "0 5 0 5" }}
                onClick={() => {
                  navigate(`/admin/units/${record.condo_id}`);
                }}
                className="unit-icon"
              />
            {/* </Tooltip>

            <Tooltip title="Users" color="#52c41a" placement="top"> */}
              <UsergroupAddOutlined
                style={{
                  fontSize: "17px",
                  margin: "0 5 0 5",
                  color: "rgb(22, 119, 255)",
                }}
                onClick={() => {
                  navigate(`/admin/Users/${record.condo_id}`);
                }}
                className="user-icon"
              />
            {/* </Tooltip> */}
            <SettingTwoTone
              style={{ fontSize: "17px", marginLeft: 5 }}
              onClick={() => handleDroawer(record)}
              className="setting-icon"
            />
          </Space>
        </>
      ),
    },
  ];
};

export default CondoColumns;
