import { Space, Tooltip } from "antd";
import urls from "../utilities/urls.json";
import {
  SettingTwoTone,
  UsergroupAddOutlined,
  VideoCameraTwoTone,
  CameraTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { BsBuildingsFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { RiCommunityLine } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { AiTwotoneSave } from "react-icons/ai";
import { FcDataSheet } from "react-icons/fc";
import { PiHouseLight } from "react-icons/pi";
import { FaWarehouse } from "react-icons/fa";

export const CondoColumns = (handleDroawer) => {
  const navigate = useNavigate();
  return [
    {
      render: () => <BsBuildingsFill style={{ fontSize: 25 }} />,
    },
    {
      title: "condo ID",
      dataIndex: "condo_id",
      key: "condo_id",
      width: "10%",
    },
    {
      title: "Address",
      dataIndex: "condo_address",
      key: "address",
      width: "20%",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: "10%",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      width: "10%",
    },
    {
      title: "Lot Count",
      dataIndex: "lot_count",
      key: "lot_count",
      width: "10%",
    },
    {
      title: "Unit Count",
      dataIndex: "unit_count",
      key: "resident_count",
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
          <Tooltip title="Lots" color="#52c41a" placement="top">
            <FaWarehouse
              color={"rgb(22, 119, 255)"}
              style={{ fontSize: "17px", marginRight: 5 }}
              onClick={() => {
                navigate(`/app/lots/${record.condo_id}`);
              }}
              className="lot-icon"
            />
          </Tooltip>
          <Tooltip title="Units" color="#52c41a" placement="top">
            <RiCommunityLine
              color={"rgb(22, 119, 255)"}
              style={{ fontSize: "20px", margin: "0 5 0 5" }}
              onClick={() => {
                navigate(`/app/units/${record.condo_id}`);
              }}
              className="unit-icon"
            />
          </Tooltip>

          <Tooltip title="Users" color="#52c41a" placement="top">
            <UsergroupAddOutlined
              style={{
                fontSize: "17px",
                margin: "0 5 0 5",
                color: "rgb(22, 119, 255)",
              }}
              onClick={() => {
                navigate(`/app/Users/${record.condo_id}`);
              }}
              className="user-icon"
            />
          </Tooltip>
          <SettingTwoTone
            style={{ fontSize: "17px", marginLeft: 5 }}
            onClick={() => handleDroawer(record)}
            className="setting-icon"
          />
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

export const CameraColumns = (
  isEditing,
  editingId,
  edit,
  cancel,
  Save,
  selections
) => {
  const columns = [
    {
      render: () => <VideoCameraTwoTone style={{ fontSize: 25 }} />,
    },
    {
      title: "Camera Id",
      dataIndex: "camera_id",
      key: "camera_id",
      width: "15%",
      editable: false,
    },
    {
      title: "Condo Id",
      dataIndex: "condo_id",
      key: "condo_id",
      width: "15%",
      editable: false,
    },
    {
      title: "Lot Id",
      dataIndex: "lot_id",
      key: "lot_id",
      width: "25%",
      editable: false,
    },
    {
      title: "OpenOLPR Id",
      dataIndex: "Data_source_camera_id",
      key: "Data_source_camera_id",
      width: "30%",
      editable: true,
    },
    {
      title: "Edit",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space
            size="middle"
            style={{ justifyContent: "center", width: "100%" }}
          >
            <Tooltip title="Save" color="#52c41a" placement="top">
              <AiTwotoneSave
                color={"rgb(82, 196, 26)"}
                style={{ fontSize: "17px" }}
                onClick={() => Save(record.lot_id)}
                className="save-icon"
              />
            </Tooltip>

            <Tooltip title="Cancel" color="#52c41a" placement="top">
              <FcCancel
                style={{ fontSize: "17px" }}
                onClick={() => cancel()}
                className="cancel-icon"
              />
            </Tooltip>
          </Space>
        ) : (
          <Space
            size="middle"
            style={{ justifyContent: "center", width: "100%" }}
          >
            <Tooltip title="Edit" color="#52c41a" placement="top">
              <FiEdit
                color={"rgb(22, 119, 255)"}
                style={{ fontSize: "17px" }}
                onClick={() => edit(record)}
                disabled={editingId !== ""}
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
        );
      },
    },
  ];

  return columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
};

export const LotsColumns = (
  isEditing,
  editingId,
  edit,
  cancel,
  Save,
  selections
) => {
  const navigate = useNavigate();
  const columns = [
    {
      render: (_, record) => (
        <FaWarehouse
          color={record.locked ? "red" : "rgb(82, 196, 26)"}
          style={{ fontSize: 25, color: record.locked ? "red" : "" }}
        />
      ),
    },
    {
      title: "Lot Id",
      dataIndex: "lot_id",
      key: "lot_id",
      width: "10%",
      editable: false,
    },
    {
      title: "Condo Id",
      dataIndex: "condo_id",
      key: "condo_id",
      width: "20%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "lot_address",
      key: "city",
      width: "20%",
      editable: true,
    },
    {
      title: "Lot Name",
      dataIndex: "lot_name",
      key: "state",
      width: "20%",
      editable: true,
    },
    {
      title: "Camera Count",
      dataIndex: "camera_count",
      key: "camera_count",
      width: "10%",
      editable: false,
    },
    {
      title: "Lot Locked",
      dataIndex: "locked",
      key: "locked",
      width: "10%",
      editable: true,
      render: (text) => <span>{text ? "Yes" : "No"}</span>,
    },
    {
      title: "More",
      key: "action",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space
            size="middle"
            style={{ justifyContent: "center", width: "100%" }}
          >
            <Tooltip title="Save" color="#52c41a" placement="top">
              <AiTwotoneSave
                color={"rgb(82, 196, 26)"}
                style={{ fontSize: "17px" }}
                onClick={() => Save()}
                className="save-icon"
              />
            </Tooltip>

            <Tooltip title="Cancel" color="#52c41a" placement="top">
              <FcCancel
                style={{ fontSize: "17px" }}
                onClick={() => cancel()}
                className="cancel-icon"
              />
            </Tooltip>
          </Space>
        ) : (
          <Space
            size="middle"
            style={{ justifyContent: "center", width: "100%" }}
          >
            <Tooltip title="Cameras" color="#52c41a" placement="top">
              <CameraTwoTone
                style={{ fontSize: "17px" }}
                onClick={() => {
                  navigate(`/app/lots/cameras/${record.lot_id}`);
                }}
                className="camera-icon"
              />
            </Tooltip>
            <Tooltip title="Camera Logs" color="#52c41a" placement="top">
              <FcDataSheet
                style={{ fontSize: "17px" }}
                onClick={() => navigate(`/app/logs/${record.lot_id}`)}
                className="camera-icon"
              />
            </Tooltip>
            <Tooltip title="Edit" color="#52c41a" placement="top">
              <FiEdit
                color={"rgb(22, 119, 255)"}
                style={{ fontSize: "17px" }}
                onClick={() => edit(record)}
                disabled={editingId !== ""}
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
        );
      },
    },
  ];

  return columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "condo_id"
            ? "select"
            : col.dataIndex === "locked"
            ? "boolean"
            : "text",
        selectItems: selections,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
};

export const UserColumns = (handleSettingsOpen) => {
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

export const UnitColumns = (handleDroawer) => {
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

export const LogsColumns = () => {
  const renderPlateNumber = (text, record) => {
    const imgUrl = `${urls.get.PicturesForLog}${record.log_id}`;
    return (
      <Tooltip
        title={<img src={imgUrl} alt="plate" width="234px" height="150px" />}
        placement="right"
        
      >
        <a href={imgUrl} target="_blank" rel="noreferrer">
          {text}
        </a>
      </Tooltip>
    );
  };

  return [
    {
      title: "Log Id",
      dataIndex: "log_id",
      key: "log_id",
    },
    {
      title: "Lot Id",
      dataIndex: "lot_id",
      key: "lot_id",
    },
    {
      title: "Log Time",
      dataIndex: "lot_time",
      key: "lot_time",
    },
    {
      title: "Plate Number",
      dataIndex: "plate_number",
      key: "plate_number",
      render: renderPlateNumber,
    },
    {
      title: "car_make",
      dataIndex: "car_make",
      key: "car_make",
    },
    {
      title: "car_model",
      dataIndex: "car_model",
      key: "car_model",
    },
    {
      title: "car_type",
      dataIndex: "car_type",
      key: "car_type",
    },
    {
      title: "car_color",
      dataIndex: "car_color",
      key: "car_color",
    },
  ];
};
