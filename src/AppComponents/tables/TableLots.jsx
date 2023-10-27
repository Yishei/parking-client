import { Table, Form, Button, Select, Input, message, Switch } from "antd";

import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { LotInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import { useParams, useLoaderData } from "react-router-dom";
import DrawerCondos from "../drawers/DrawerCondos";
import Columns  from "../../utilities/TableColumns/LotsColumns";
import {
  getCondosOptions,
  getLots,
  updateLot,
} from "../../utilities/fetchData";

const TableLots = () => {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [lotsTableSelections, setLotsTableSelections] = useState([]);
  const [data, setData] = useState(useLoaderData());
  const [form] = Form.useForm();
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { condoId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const isEditing = (record) => record.lot_id === editingId;

  const lodingmsg = () => {
    messageApi.open({
      type: "loading",
      content: "Updating...",
    });
  };

  const successmsg = () => {
    messageApi.open({
      type: "success",
      content: "Lot updated successfully",
      duration: 2,
    });
  };

  const errormsg = () => {
    messageApi.open({
      type: "error",
      content: "Error updating lot",
      duration: 2,
    });
  };

  useEffect(() => {
    const headInfo = LotInfoBredcrumb({ id: condoId });
    setAppInnerHeadContent(headInfo);
    getCondosOptions().then((res) => {
      setLotsTableSelections(res);
    });
  }, [setAppInnerHeadContent, condoId]);

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingId(record.lot_id);
  };

  const cancel = () => {
    form.resetFields();
    setEditingId("");
  };

  const save = async (key) => {
    form
      .validateFields()
      .then(() => {
        lodingmsg();
        saveUpdate();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const saveUpdate = async () => {
    const record = form.getFieldsValue();
    const res = await updateLot(editingId, record);
    messageApi.destroy();
    cancel();
    if (res === "success") {
      successmsg();
      const res = await getLots(condoId);
      setData(res);
    } else {
      errormsg();
    }
  };

  // const saveNew = async () => {
  //   console.log("saveNew");
  // };

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
      inputType === "text" ? (
        <Input maxLength={40} />
      ) : inputType === "boolean" ? (
        <Switch defaultChecked={record.locked} checkedChildren="Locked" />
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

  const columns = Columns(
    isEditing,
    editingId,
    edit,
    cancel,
    save,
    lotsTableSelections
  );

  const rowClassName = (record) => {
    return record.locked ? "locked-row" : "";
  };

  return (
    <>
      {contextHolder}
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
