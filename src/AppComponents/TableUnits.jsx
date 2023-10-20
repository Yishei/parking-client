import { Table, Button } from "antd";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { UnitInfoBredcrumb } from "../utilities/HeaderBreadcrumbs";
import { UnitColumns } from "../utilities/TableColumns";
import DrawerUnit from "./DrawerUnit";

const TableUnits = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(useLoaderData());
  const [editRecord, setEditRecord] = useState(null);
  const { condoId } = useParams();
  const { setAppInnerHeadContent } = useContext(AppContext);

  const handleSettingsOpen = (record) => {
    setIsEdit(true);
    setEditRecord(record);
    setDrawerOpen(true);
  };

  const handleNewUnit = () => {
    setData([]);
    setIsEdit(false);
    setEditRecord(null);
    setDrawerOpen(true);
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
        setEditRecord={setEditRecord}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <Table
        columns={UnitColumns(handleSettingsOpen)}
        dataSource={data}
        rowKey={(record) => record.unit_id}
        pagination={false}
      />
    </>
  );
};
export default TableUnits;
