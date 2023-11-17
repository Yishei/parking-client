import { useState, useContext, useEffect } from "react";
import { Button, Table } from "antd";
import { AppContext } from "../../Context/AppContext";
import { MessageContext } from "../../Context/MessageContext";
import { HomeBreadcrumb } from "../../utilities/HeaderBreadcrumbs";
import DrawerCondos from "../drawers/DrawerCondos";
import Columns from "../../utilities/TableColumns/CondoColumns";
import { useLoaderData, useNavigation } from "react-router-dom";
import { getCondos } from "../../utilities/fetchData";

const TableCondos = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState(useLoaderData());
  const { setAppInnerHeadContent } = useContext(AppContext);
  const navigation = useNavigation();
  const { msg } = useContext(MessageContext);

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
    setTableLoading(true);
    const data = await getCondos();
    if (data.length > 0) {
      setData(data);
    } else {
      msg("error", "Error Getting Data");
    }
    setTableLoading(false);
  };

  useEffect(() => {
    if (data === null && navigation.state !== "loading") {
      msg("error", "Error Getting Data");
    }
  }, [data, msg, navigation.state]);

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
        columns={Columns(handleSettingsOpen)}
        dataSource={data}
        rowKey={(record) => record.condo_id}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15"],
          position: "bottomCenter",
        }}
        loading={tableLoading}
        scroll={{
          y: 500,
        }}
      />
    </>
  );
};
export default TableCondos;
