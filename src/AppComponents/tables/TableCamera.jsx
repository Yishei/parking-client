import { Form, Table, Button, InputNumber } from "antd";
import { useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { MessageContext } from "../../Context/MessageContext";
import { CameraInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import Columns from "../../utilities/TableColumns/CameraColumns";
import urls from "../../utilities/urls.json";
import ModalCameras from "../Modals/ModalCameras";
import { apiService } from "../../utilities/apiService";

const TableCamera = () => {
  const [editingId, setEditingId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { msg } = useContext(MessageContext);
  const [data, setData] = useState(useLoaderData());
  const [form] = Form.useForm();
  const { lotId } = useParams();
  const isEditing = (record) => record.camera_id === editingId;

  const handleDeleteSuccess = async () => {
    msg("success", "Camera deleted successfully");
    await fetchData();
  };

  const handleDeleteError = () => {
    msg("error", "Error deleting camera");
  };

  useEffect(() => {
    const headInfo = CameraInfoBredcrumb({ id: lotId });
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, lotId]);

  const fetchData = async () => {
    setTableLoading(true);
    const data = await apiService.get(
      `${urls.baseURl}${urls.get.camerasForLot}${lotId}`
    );
    if (data.length > 0) {
      setData(data);
    } else {
      msg("error", "Error Getting Data");
    }
    setTableLoading(false);
  };

  const edit = (record) => {
    form.setFieldsValue({
      camera_id: "",
      condo_id: "",
      lot_id: "",
      data_source_camera_id: "",
      ...record,
    });
    setEditingId(record.camera_id);
  };
  const cancel = () => {
    form.resetFields();
    setEditingId("");
  };

  const save = async (key) => {
    form
      .validateFields()
      .then((row) => {
        msg("loading", "Updating Data");
        saveUpdate();
      })
      .catch((errInfo) => {
        console.log("Validate Failed:", errInfo);
        cancel();
      });
  };

  const saveUpdate = async () => {
    const record = form.getFieldsValue();
    //const res = await updateCamera(editingId, record);
    const res = await apiService.put(
      `${urls.baseURl}${urls.put.updateCamera}${editingId}`,
      record
    );
    cancel();
    if (res === "success") {
      msg("success", "Camera updated successfully");
      await fetchData();
    } else {
      msg("error", "Error Updating Data");
    }
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
              {
                validator: async (_, value) => {
                  if (value) {
                    const exists = await apiService.get(
                      `${urls.baseURl}${urls.get.seeIfCamaeraExists}?camId=${value}&uptRcId=${record.camera_id}`
                    );

                    if (exists) {
                      return Promise.reject(
                        new Error("This Camera ID Already Exists")
                      );
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              maxLength={15}
              controls={false}
              style={{ width: "100%" }}
            />
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = Columns(
    isEditing,
    editingId,
    edit,
    cancel,
    save,
    handleDeleteSuccess,
    handleDeleteError
  );

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setDrawerOpen(true);
          cancel();
        }}
        style={{ marginBlock: 16, width: "100%", backgroundColor: "#52c41a" }}
      >
        Add New Camera
      </Button>
      <Form form={form} component={false}>
        <ModalCameras
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          fetchData={fetchData}
        />
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.camera_id}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15"],
            position: "bottomCenter",
          }}
          onChange={() => {
            cancel();
          }}
          loading={tableLoading}
        />
      </Form>
    </>
  );
};
export default TableCamera;
