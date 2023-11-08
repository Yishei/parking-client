import { Form, Table, Button, InputNumber } from "antd";
import { useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { CameraInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import Columns from "../../utilities/TableColumns/CameraColumns";
import {
  getCameras,
  updateCamera,
  seeIfCameraExists,
} from "../../utilities/fetchData";
import DrawerCameras from "../drawers/DrawerCameras";

const TableCamera = () => {
  const [editingId, setEditingId] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { setAppInnerHeadContent } = useContext(AppContext);
  const [data, setData] = useState(useLoaderData());
  const [form] = Form.useForm();
  const { lotId } = useParams();
  const isEditing = (record) => record.camera_id === editingId;

  useEffect(() => {
    const headInfo = CameraInfoBredcrumb({ id: lotId });
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, lotId]);

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
        saveUpdate();
      })
      .catch((errInfo) => {
        console.log("Validate Failed:", errInfo);
        cancel();
      });
  };

  const saveUpdate = async () => {
    const record = form.getFieldsValue();
    const res = await updateCamera(editingId, record);
    if (res === "success") {
      fetchData();
    } else {
      console.log("res", res);
    }
    cancel();
  };

  const fetchData = async () => {
    const res = await getCameras(lotId);
    setData(res);
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
                    const exists = await seeIfCameraExists(
                      value,
                      record.camera_id
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

  const columns = Columns(isEditing, editingId, edit, cancel, save);

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
        <DrawerCameras drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
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
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};
export default TableCamera;
