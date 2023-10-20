import { Form, Table, Button, InputNumber, Select } from "antd";
import { useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { CameraInfoBredcrumb } from "../utilities/HeaderBreadcrumbs";
import { CameraColumns } from "../utilities/TableColumns";
import { CameraTableSelection } from "../utilities/menuItems";

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
        console.log("row", row);
        cancel();
      })
      .catch((errInfo) => {
        console.log("Validate Failed:", errInfo);
      });
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    record,
    inputType,
    selectItems,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "number" ? (
        <InputNumber
          controls={false}
          step={1}
          style={{ width: "75%" }}
          maxLength={15}
        />
      ) : (
        <Select options={selectItems} />
      );
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
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const columns = CameraColumns(
    isEditing,
    editingId,
    edit,
    cancel,
    save,
    CameraTableSelection
  );

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
