import { Space, Tooltip, Modal } from "antd";
import {
  VideoCameraTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { deleteCamera } from "../fetchData";
import { FiEdit } from "react-icons/fi";
import { FcCancel } from "react-icons/fc";
import { AiTwotoneSave } from "react-icons/ai";
const { confirm } = Modal;

const CameraColumns = (
  isEditing,
  editingId,
  edit,
  cancel,
  Save,
  handleDeleteSuccess,
  handleDeleteError
) => {
  const showConfirm = (record) => {
    confirm({
      title: "Do you Want to delete this condo?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          This action cannot be undone this condo has:
          <br />
          All associated Camera Logs will be deleted.
          <br />
        </div>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        const res = await deleteCamera(record.camera_id);
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
            {/* <Tooltip title="Save" color="#52c41a" placement="top"> */}
              <AiTwotoneSave
                color={"rgb(82, 196, 26)"}
                style={{ fontSize: "17px" }}
                onClick={() => Save(record.lot_id)}
                className="save-icon"
              />
            {/* </Tooltip> */}

            {/* <Tooltip title="Cancel" color="#52c41a" placement="top"> */}
              <FcCancel
                style={{ fontSize: "17px" }}
                onClick={() => cancel()}
                className="cancel-icon"
              />
            {/* </Tooltip> */}
          </Space>
        ) : (
          <Space
            size="middle"
            style={{ justifyContent: "center", width: "100%" }}
          >
            {/* <Tooltip title="Edit" color="#52c41a" placement="top"> */}
              <FiEdit
                color={"rgb(22, 119, 255)"}
                style={{ fontSize: "17px" }}
                onClick={() => edit(record)}
                disabled={editingId !== ""}
                className="edit-icon"
              />
            {/* </Tooltip> */}
            {/* <Tooltip title="Delete" color="red" placement="top"> */}
              <DeleteTwoTone
                twoToneColor={"#eb2f96"}
                style={{ fontSize: "17px" }}
                onClick={() => showConfirm(record)}
                className="edit-icon"
              />
            {/* </Tooltip> */}
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

export default CameraColumns;
