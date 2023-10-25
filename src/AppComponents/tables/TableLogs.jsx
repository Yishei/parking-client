import { Table } from "antd";
import { LogsColumns } from "../../utilities/TableColumns";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const TableLogs = () => {
  const [data, setData] = useState(useLoaderData());
  return (
    <>
      <Table
        columns={LogsColumns()}
        dataSource={data}
        rowKey={(record) => record.log_id}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default TableLogs;
