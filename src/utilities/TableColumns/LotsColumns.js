import { Space, Tooltip, Modal } from "antd";
import {
  CameraTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { deleteLot } from "../fetchData";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FcCancel } from "react-icons/fc";
import { AiTwotoneSave } from "react-icons/ai";
import { FcDataSheet } from "react-icons/fc";
import { FaWarehouse } from "react-icons/fa";
const { confirm } = Modal;

const LotsColumns = (
  isEditing,
  editingId,
  edit,
  cancel,
  Save,
  selections,
  handleDeleteSuccess,
  handleDeleteError
) => {
  const navigate = useNavigate();

  const showConfirm = (record) => {
    confirm({
      title: "Do you Want to delete this condo?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          This action cannot be undone this condo has:
          <br />
          {record.camera_count} Cameras.
          <br />
          All associated data will be deleted.
          <br />
        </div>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const res = await deleteLot(record.lot_id);
        if (res === "success") {
          await handleDeleteSuccess();
        } else {
          handleDeleteError();
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      render: (_, record) => (
        <FaWarehouse
          color={record.locked ? "red" : "rgb(82, 196, 26)"}
          style={{ fontSize: 25, color: record.locked ? "red" : "" }}
          width="5%"
        />
      ),
    },
    {
      title: "Lot Id",
      dataIndex: "lot_id",
      key: "lot_id",
      width: "10%",
      editable: false,
      sorter: (a, b) => a.lot_id - b.lot_id,
    },
    {
      title: "Condo Id",
      dataIndex: "condo_id",
      key: "condo_id",
      width: "10%",
      editable: true,
      sorter: (a, b) => a.condo_id - b.condo_id,
    },
    {
      title: "Address",
      dataIndex: "lot_address",
      key: "city",
      width: "17%",
      editable: true,
    },
    {
      title: "Lot Name",
      dataIndex: "lot_name",
      key: "state",
      width: "17%",
      editable: true,
    },
    {
      title: "Camera Count",
      dataIndex: "camera_count",
      key: "camera_count",
      width: "15%",
      editable: false,
      sorter: (a, b) => a.camera_count - b.camera_count,
    },
    {
      title: "Lot Locked",
      dataIndex: "locked",
      key: "locked",
      width: "10%",
      editable: true,
      sorter: (a, b) => a.locked - b.locked,
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
                onClick={() => navigate(`/app/lots/logs/${record.lot_id}`)}
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
                onClick={() => showConfirm(record)}
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

export default LotsColumns;
