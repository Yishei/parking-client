import { Form, Table, Button, InputNumber } from "antd";
import { useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { CameraInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import { CameraColumns } from "../../utilities/TableColumns";
import { getCameras, updateCamera } from "../../utilities/fetchData";

const TableCamera = () => {
  const { setAppInnerHeadContent } = useContext(AppContext);
  const [data, setData] = useState(useLoaderData());
  const [editingId, setEditingId] = useState("");
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
    setData([...data]);
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

  const columns = CameraColumns(isEditing, editingId, edit, cancel, save);

  return (
    <>
      <Button
        type="primary"
        style={{ marginBlock: 16, width: "100%", backgroundColor: "#52c41a" }}
      >
        Add New Camera
      </Button>
      <Form form={form} component={false}>
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
