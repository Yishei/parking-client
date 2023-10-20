import { Table, Button } from "antd";
import { useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import { UsersInfoBredcrumb } from "../utilities/HeaderBreadcrumbs";
import { UserColumns } from "../utilities/TableColumns";
import DrawerUser from "./DrawerUsers";


const TableUsers = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [data, setData] = useState(useLoaderData());
  const { condoId } = useParams();
  const { setAppInnerHeadContent } = useContext(AppContext);

  useEffect(() => {
    const headInfo = UsersInfoBredcrumb({ id: condoId });
    setData([...data]);
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, condoId, data]);

  return (
    <>
    <Button
      type="primary"
      onClick={() => setDrawerOpen(true)}
      style={{ marginBlock: 16, width: "100%", backgroundColor: "#52c41a"}}
      >
        Add New User
      </Button>
      <DrawerUser
      drawerOpen={drawerOpen}
      setDrawerOpen={setDrawerOpen}
      editRecord={editRecord}
      setEditRecord={setEditRecord}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      />
      <Table
        columns={UserColumns(setDrawerOpen)}
        dataSource={data}
        rowKey={(record) => record.user_id}
        pagination={false}
      />
    </>
  );
};
export default TableUsers;
