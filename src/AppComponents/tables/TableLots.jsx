import { Table, Form, Button, Select, Input, Switch } from "antd";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { MessageContext } from "../../Context/MessageContext";
import { LotInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import { useParams, useLoaderData, NavLink } from "react-router-dom";
import Columns from "../../utilities/TableColumns/LotsColumns";
import {
  getCondosOptions,
  getLots,
  updateLot,
} from "../../utilities/fetchData";
import DrawerLots from "../drawers/DrawerLots";

const TableLots = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [tableLoading, setTableLoading] = useState(false);
  const [lotsTableSelections, setLotsTableSelections] = useState([]);
  const [data, setData] = useState(useLoaderData());
  const [form] = Form.useForm();
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { condoId } = useParams();
  const { msg, closeMsg } = useContext(MessageContext);
  const isEditing = (record) => record.lot_id === editingId;

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

    const handleDeleteSuccess =  async() => {
      msg("success", "Lot deleted successfully");
      await fetchData();
    }

    const handleDeleteError = () => {
      msg("error", "Error deleting lot");
    }

  useEffect(() => {
    const headInfo = LotInfoBredcrumb({ id: condoId });
    setAppInnerHeadContent(headInfo);
    getCondosOptions().then((res) => {
      setLotsTableSelections(res);
    });
  }, [setAppInnerHeadContent, condoId]);

  const fetchData = async () => {
    setTableLoading(true);
    const data = await getLots(condoId);
    if (data) {
      setData(data);
    } else {
      msg("error", "Error Getting Data");
    }
    setTableLoading(false);
  };

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
        msg("loading", "Updating...");
        saveUpdate();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const saveUpdate = async () => {
    const record = form.getFieldsValue();
    const res = await updateLot(editingId, record);
    closeMsg();
    cancel();
    if (res === "success") {
      msg("success", "Lot updated successfully");
      await fetchData();
    } else {
      msg("error", "Error updating lot");
    }
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
      inputType === "text" ? (
        <Input maxLength={40} />
      ) : inputType === "boolean" ? (
        <Switch defaultChecked={record.locked} checkedChildren="Locked" />
      ) : (
        <Select
          options={selectItems}
          showSearch
          allowClear
          optionFilterProp="children"
          filterOption={filterOption}
          notFoundContent={
            <div>
              Driver Not Fownd <NavLink to={`/app`}>create one</NavLink>
            </div>
          }
        />
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
    lotsTableSelections,
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
        Add New Lot
      </Button>
      <Form form={form} component={false}>
        <DrawerLots
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
          rowKey={(record) => record.lot_id}
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
export default TableLots;
