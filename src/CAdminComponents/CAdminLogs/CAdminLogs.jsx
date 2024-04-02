import { Table } from "antd";
import Columns from "../../utilities/TableColumns/LogsColumns";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { LogInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";
import "./CAdminLogs.css";

const TableLogs = () => {
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { lotId } = useParams();

  useEffect(() => {
    const headInfo = LogInfoBredcrumb({ id: lotId });
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, lotId]);
  return (
    <div className="main-container">
      <div className="table-container">
        <Table
          columns={Columns()}
          dataSource={useLoaderData()}
          rowKey={(record) => record.log_id}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default TableLogs;
