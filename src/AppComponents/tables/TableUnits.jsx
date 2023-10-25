import { Table, Button } from "antd";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { UnitInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import { UnitColumns } from "../../utilities/TableColumns";
import DrawerUnit from "../drawers/DrawerUnit";
import { getUnits } from "../../utilities/fetchData";

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
    setIsEdit(false);
    setEditRecord(null);
    setDrawerOpen(true);
  };

  const fetchData = async (condoId) => {
    const data = await getUnits(condoId);
    setData(data);
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
      {drawerOpen && (
        <DrawerUnit
          setDrawerOpen={setDrawerOpen}
          editRecord={editRecord}
          isEdit={isEdit}
          fetchData={fetchData}
        />
      )}
      <Table
        columns={UnitColumns(handleSettingsOpen)}
        dataSource={data}
        rowKey={(record) => record.unit_id}
        pagination={
          data.length > 10
            ? {
                pageSize: 10,
                total: data.length,
                showSizeChanger: false,
              }
            : false
        }
      />
    </>
  );
};
export default TableUnits;
