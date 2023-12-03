import { Table, Empty } from "antd";
import { IoAdd } from "react-icons/io5";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { MessageContext } from "../../Context/MessageContext";
import { UnitInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import Columns from "../../utilities/TableColumns/UnitsColumns";
import DrawerUnit from "../drawers/DrawerUnit";
import urls from "../../utilities/urls.json";
import { apiService } from "../../utilities/apiService";
import SidePanel from "../adminComponents/SidePanel";

const TableUnits = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(useLoaderData());
  const [filterdData, setFilterdData] = useState(useLoaderData());
  const [editRecord, setEditRecord] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const { condoId } = useParams();
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { msg } = useContext(MessageContext);

  const handleFilter = (value, _e, info) => {
    const filterd = data.filter((item) => {
      return item.username.toLowerCase().includes(value.toLowerCase());
    });
    setFilterdData(filterd);
  };
      
  const handleDelete = async (record) => {
    //const res = await deleteUnit(record.unit_id);
    const res = await apiService.delete(
      `${urls.baseURl}${urls.delete.deleteUnit}${record.unit_id}`
    );
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
    const data = await apiService.get(
      `${urls.baseURl}${urls.get.unitsForCondo}${condoId}`
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
    const headInfo = UnitInfoBredcrumb({ id: condoId });
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, condoId]);

  return (
    <>
      <div className="container">
        <SidePanel createNew={handleNewUnit} handleFilter={handleFilter}/>
        <div className="table">
         
          <DrawerUnit
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            editRecord={editRecord}
            isEdit={isEdit}
            fetchData={fetchData}
          />
          <Table
            columns={Columns(handleSettingsOpen, handleDelete)}
            dataSource={filterdData}
            rowKey={(record) => record.unit_id}
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
                  <IoAdd className="add-icon" onClick={handleNewUnit} />
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
export default TableUnits;
