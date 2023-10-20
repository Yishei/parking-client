import { useState, useContext, useEffect } from "react";
import { Button, Table } from "antd";
import { AppContext } from "../Context/AppContext";
import { HomeBreadcrumb } from "../utilities/HeaderBreadcrumbs";
import DrawerCondos from "./DrawerCondos";
import { CondoColumns } from "../utilities/TableColumns";
import { useLoaderData } from "react-router-dom";

const TableCondos = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [data, setData] = useState(useLoaderData());
  console.log("data", data);
  const { setAppInnerHeadContent } = useContext(AppContext);

  const handleSettingsOpen = (record) => {
    setIsEdit(true);
    setEditRecord(record);
    setDrawerOpen(true);
  };

  const handleNewCondo = () => {
    setData([...data]);
    setIsEdit(false);
    setEditRecord(null);
    setDrawerOpen(true);
  };

  useEffect(() => {
    const headInfo = HomeBreadcrumb();
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent]);

  return (
    <>
      <Button
        type="primary"
        onClick={handleNewCondo}
        style={{ marginBlock: 16, width: "100%", backgroundColor: "#52c41a" }}
      >
        Add New Condo
      </Button>
      <DrawerCondos
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        editRecord={editRecord}
        setEditRecord={setEditRecord}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
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
