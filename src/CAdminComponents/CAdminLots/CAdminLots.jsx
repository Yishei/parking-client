import { Table, Form, Input, Switch, Empty } from "antd";
import { IoAdd } from "react-icons/io5";
import urls from "../../utilities/urls.json";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { MessageContext } from "../../Context/MessageContext";
import { LotInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import { useParams, useLoaderData } from "react-router-dom";
import Columns from "../../utilities/TableColumns/LotsColumns";
import ModalLots from "../../AppComponents/Modals/ModalLots";
import { apiService } from "../../utilities/apiService";
import SidePanel from "../../AppComponents/adminComponents/SidePanel";
import "./CAdminLots.css";

const TableLots = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState(useLoaderData());
  const [filterdData, setFilterdData] = useState(useLoaderData());
  const [form] = Form.useForm();
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { condoId } = useParams();
  const { msg } = useContext(MessageContext);
  const isEditing = (record) => record.lot_id === editingId;

  const handleFilter = (value, _e, info) => {
    const filterd = data.filter((item) => {
      return Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilterdData(filterd);
  };

  const createNewBtnHandler = () => {
    setDrawerOpen(true);
    cancel();
  };

  const handleDeleteSuccess = async () => {
    msg("success", "Lot deleted successfully");
    await fetchData();
  };

  const handleDeleteError = () => {
    msg("error", "Error deleting lot");
  };

  useEffect(() => {
    const headInfo = LotInfoBredcrumb({ id: condoId });
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, condoId]);

  const fetchData = async () => {
    setTableLoading(true);
    const data = await apiService.get(
      `${urls.baseURl}${urls.get.lotsForCondo}${condoId}`
    );
    if (data.length > 0) {
      setData(data);
      setFilterdData(data);
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
    const res = await apiService.put(
      `${urls.baseURl}${urls.put.updateLot}${editingId}`,
      record
    );
    console.log(res, "reds");
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
      ) : (
        inputType === "boolean" && (
          <Switch defaultChecked={record.locked} checkedChildren="Locked" />
        )
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
    handleDeleteSuccess,
    handleDeleteError
  );

  return (
    <div className="main-container">
      <div className="lot-table-container">
        <Form form={form} component={false}>
          <ModalLots
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            fetchData={fetchData}
          />
          <Table
            className="table"
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            columns={columns}
            dataSource={filterdData}
            rowKey={(record) => record.lot_id}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
              position: "bottomCenter",
            }}
            locale={{
              emptyText: (
                <Empty
                  description={<span>No Data</span>}
                  imageStyle={{ fontSize: 35 }}
                >
                  <IoAdd
                    className="add-icon"
                    onClick={() => {
                      setDrawerOpen(true);
                      cancel();
                    }}
                  />
                </Empty>
              ),
            }}
            onChange={() => {
              cancel();
            }}
            loading={tableLoading}
          />
        </Form>
      </div>
      <div className="lot-side-panel-container">
        <SidePanel
          handleFilter={handleFilter}
          createNew={createNewBtnHandler}
        />
      </div>
    </div>
  );
};
export default TableLots;
