import { Table, Form, Button, InputNumber, Select } from "antd";

import { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { LotInfoBredcrumb } from "../utilities/HeaderBreadcrumbs";
import { useParams, useLoaderData } from "react-router-dom";
import DrawerCondos from "./DrawerCondos";
import { LotsColumns } from "../utilities/TableColumns";
import { LotsTableSelection } from "../utilities/menuItems";

const TableLots = () => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [data, setData] = useState(useLoaderData());
  const [form] = Form.useForm();
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { condoId } = useParams();
  const isEditing = (record) => record.lot_id === editingId;

  useEffect(() => {
    const headInfo = LotInfoBredcrumb({ id: condoId });
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, condoId]);

  const edit = (record) => {
    form.setFieldsValue({
      lot_id: "",
      condo_id: "",
      address: "",
      lot_name: "",
      ...record,
    });
    setEditingId(record.lot_id);
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
      ) : inputType === "boolean" ? (
        <Select defaultValue={record.locked}>
          <Select.Option value={1}>Yes</Select.Option>
          <Select.Option value={0}>No</Select.Option>
        </Select>
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

  const columns = LotsColumns(
    isEditing,
    editingId,
    edit,
    cancel,
    save,
    LotsTableSelection
  );

  const rowClassName = (record) => {
    return record.locked ? "locked-row" : "";
  }

  return (
    <>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        style={{ marginBlock: 16, width: "100%", backgroundColor: "#52c41a" }}
      >
        Add New Lot
      </Button>
      <Form form={form} component={false}>
        <DrawerCondos open={open} setOpen={setOpen} />
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.lot_id}
          pagination={{
            onChange: cancel,
          }}
          rowClassName={rowClassName}
        />
      </Form>
    </>
  );
};
export default TableLots;
