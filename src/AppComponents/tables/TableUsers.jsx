import { Table, Button } from "antd";
import { useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { MessageContext } from "../../Context/MessageContext";
import { UsersInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import Columns from "../../utilities/TableColumns/UsersColumns";
import DrawerUser from "../drawers/DrawerUsers";
import { getUsers } from "../../utilities/fetchData";

const TableUsers = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState(useLoaderData());
  const { condoId } = useParams();
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { msg } = useContext(MessageContext);

  const handleSettingsOpen = (record) => {
      setIsEdit(true);
      setEditRecord(record);
      console.log(record);
      setDrawerOpen(true);
  };

  const handleNewUserOpen = () => {
    setIsEdit(false);
    setEditRecord(null);
    setDrawerOpen(true);
  };

  const fetchData = async () => {
    setTableLoading(true);
    const data = await getUsers(condoId);
    if (data.length > 0) {
      setData(data);
    } else {
      msg("error", "Error Getting Data");
    }
    setTableLoading(false);
  };

  useEffect(() => {
    const headInfo = UsersInfoBredcrumb({ id: condoId });
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, condoId, data]);

  return (
    <>
      <Button
        type="primary"
        onClick={handleNewUserOpen}
        style={{ marginBlock: 16, width: "100%", backgroundColor: "#52c41a" }}
      >
        Add New User
      </Button>
      <DrawerUser
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        editRecord={editRecord}
        isEdit={isEdit}
        fetchData={fetchData}
      />
      <Table
        columns={Columns()}
        dataSource={data}
        rowKey={(record) => record.user_id}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              handleSettingsOpen(record);
            },
          };
        }}
        rowClassName={(record, rowIndex) => "row-table-users"}
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
export default TableUsers;
