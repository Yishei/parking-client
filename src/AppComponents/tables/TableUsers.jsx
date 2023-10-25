import { Table, Button } from "antd";
import { useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { UsersInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import { UserColumns } from "../../utilities/TableColumns";
import DrawerUser from "../drawers/DrawerUsers";
import { getUsers } from "../../utilities/fetchData";

const TableUsers = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [data, setData] = useState(useLoaderData());
  const { condoId } = useParams();
  const { setAppInnerHeadContent } = useContext(AppContext);

  const handleSettingsOpen = (record) => {
    setEditRecord(record);
    setIsEdit(true);
    setDrawerOpen(true);
  };

  // const handleNewUserOpen = () => {
  //   setEditRecord(null);
  //   setIsEdit(false);
  //   setDrawerOpen(true);
  // };

  const cancelDrawer = () => {
    setEditRecord(null);
    setIsEdit(false);
    setDrawerOpen(false);
  };

  const fetchData = async () => {
    const res = await getUsers(condoId);
    setData(res);
    return;
  };

  useEffect(() => {
    const headInfo = UsersInfoBredcrumb({ id: condoId });
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, condoId, data]);

  return (
    <>
      <Button
        type="primary"
        onClick={() => setDrawerOpen(true)}
        style={{ marginBlock: 16, width: "100%", backgroundColor: "#52c41a" }}
      >
        Add New User
      </Button>
      <DrawerUser
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        editRecord={editRecord}
        isEdit={isEdit}
        cancelDrawer={cancelDrawer}
        fetchData={fetchData}
      />
      <Table
        columns={UserColumns(handleSettingsOpen)}
        dataSource={data}
        rowKey={(record) => record.user_id}
        pagination={false}
      />
    </>
  );
};
export default TableUsers;
