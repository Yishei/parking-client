import { Table } from "antd";
import Columns from "../../utilities/TableColumns/LogsColumns";
import { useLoaderData, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { LogInfoBredcrumb } from "../../utilities/HeaderBreadcrumbs";

const TableLogs = () => {
  const { setAppInnerHeadContent } = useContext(AppContext);
  const { lotId } = useParams();

  useEffect(() => {
    const headInfo = LogInfoBredcrumb({ id: lotId });
    setAppInnerHeadContent(headInfo);
  }, [setAppInnerHeadContent, lotId]);
  return (
    <>
      <Table
        columns={Columns()}
        dataSource={useLoaderData()}
        rowKey={(record) => record.log_id}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default TableLogs;
