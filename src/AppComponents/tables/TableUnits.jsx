import { Table, Button } from "antd";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { MessageContext } from "../../Context/MessageContext";
import { UnitInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import Columns from "../../utilities/TableColumns/UnitsColumns";
import DrawerUnit from "../drawers/DrawerUnit";
import { deleteUnit, getUnits } from "../../utilities/fetchData";

const TableUnits = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(useLoaderData());
  const [editRecord, setEditRecord] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const { condoId } = useParams();
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { msg } = useContext(MessageContext);

  const handleDelete = async (record) => {
    const res = await deleteUnit(record.unit_id);
    if (res === "success") {
      msg("success", "Unit Deleted");
      fetchData();
    } else {
      msg("error", "Error Deleting Unit");
    }
  };

  const handleSettingsOpen = (record) => {
    setIsEdit(true);
    setEditRecord(record);
    setDrawerOpen(true);
  };

  const handleNewUnit = () => {
    setIsEdit(false);
    setEditRecord(null);
    setDrawerOpen(true);
  };

  const fetchData = async () => {
    setTableLoading(true);
    const data = await getUnits(condoId);
    if (data.length > 0) {
      setData(data);
    } else {
      msg("error", "Error Getting Data");
    }
    setTableLoading(false);
  };

  useEffect(() => {
    const headInfo = UnitInfoBredcrumb({ id: condoId });
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, condoId]);

  return (
    <>
      <Button
        type="primary"
        onClick={() => handleNewUnit()}
        style={{ marginBlock: 16, width: "100%", backgroundColor: "#52c41a" }}
      >
        Add New Unit
      </Button>
      <DrawerUnit
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        editRecord={editRecord}
        isEdit={isEdit}
        fetchData={fetchData}
      />
      <Table
        columns={Columns(handleSettingsOpen, handleDelete)}
        dataSource={data}
        rowKey={(record) => record.unit_id}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
          position: "bottomCenter",
        }}
        loading={tableLoading}
      />
    </>
  );
};
export default TableUnits;
