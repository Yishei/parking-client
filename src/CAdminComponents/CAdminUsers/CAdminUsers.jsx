import { Table, Empty } from "antd";
import { IoAdd } from "react-icons/io5";
import { useParams, useLoaderData } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { MessageContext } from "../../Context/MessageContext";
import { UsersInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import Columns from "../../utilities/TableColumns/UsersColumns";
import urls from "../../utilities/urls.json";
import { apiService } from "../../utilities/apiService";
import SidePanel from "../../AppComponents/adminComponents/SidePanel";
import ModalUsers from "../../AppComponents/Modals/ModalUsers";
import "./CAdminUsers.css";

const TableUsers = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [data, setData] = useState(useLoaderData());
  const [filterdData, setFilterdData] = useState(useLoaderData());
  const { condoId } = useParams();
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { msg } = useContext(MessageContext);

  const handleFilter = (value, _e, info) => {
    const filterd = data.filter((item) => {
      return Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilterdData(filterd);
  };

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
    const data = await apiService.get(
      `${urls.baseURl}${urls.get.usersForCondo}${condoId}`
    );
    if (data.length > 0) {
      setData(data);
      setFilterdData(data);
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
      <div className="main-container">
        <div className="user-side-panel-container">
          <SidePanel
            handleFilter={handleFilter}
            createNew={handleNewUserOpen}
          />
        </div>
        <div className="user-table-container">
          <ModalUsers
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            editRecord={editRecord}
            isEdit={isEdit}
            fetchData={fetchData}
          />
          <Table
            columns={Columns()}
            dataSource={filterdData}
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
            locale={{
              emptyText: (
                <Empty
                  description={<span>No Data</span>}
                  imageStyle={{ fontSize: 35 }}
                >
                  <IoAdd className="add-icon" onClick={handleNewUserOpen} />
                </Empty>
              ),
            }}
            loading={tableLoading}
          />
        </div>
      </div>
    </>
  );
};
export default TableUsers;
