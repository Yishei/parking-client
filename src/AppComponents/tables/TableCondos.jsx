import { useState, useContext, useEffect } from "react";
import { Button, Table } from "antd";
import { AppContext } from "../../Context/AppContext";
import { HomeBreadcrumb } from "../../utilities/HeaderBreadcrumbs";
import DrawerCondos from "../drawers/DrawerCondos";
import { CondoColumns } from "../../utilities/TableColumns";
import { useLoaderData } from "react-router-dom";
import { getCondos } from "../../utilities/fetchData";

const TableCondos = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [data, setData] = useState(useLoaderData());
  const { setAppInnerHeadContent } = useContext(AppContext);

  const handleSettingsOpen = (record) => {
    setIsEdit(true);
    setEditRecord(record);
    setDrawerOpen(true);
  };

  const handleNewCondoOpen = () => {
    setIsEdit(false);
    setEditRecord(null);
    setDrawerOpen(true);
  };

  const fetchData = async () => {
    const data = await getCondos();
    setData(data);
  };

  useEffect(() => {
    const headInfo = HomeBreadcrumb();
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent]);

  return (
    <>
      <Button
        type="primary"
        onClick={handleNewCondoOpen}
        style={{ marginBlock: 16, width: "100%", backgroundColor: "#52c41a" }}
      >
        Add New Condo
      </Button>
      <DrawerCondos
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        editRecord={editRecord}
        isEdit={isEdit}
        fetchData={fetchData}
      />
      <Table
        columns={CondoColumns(handleSettingsOpen)}
        dataSource={data}
        rowKey={(record) => record.condo_id}
        pagination={false}
      />
    </>
  );
};
export default TableCondos;
