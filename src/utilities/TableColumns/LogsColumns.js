import { Tooltip } from "antd";
import moment from "moment";
import urls from "../../utilities/urls.json";

const LogsColumns = () => {
  const renderPlateNumber = (text, record) => {
    const imgUrl = `${urls.get.PicturesForLog}${record.log_id}`;
    return (
      <Tooltip
        title={<img src={imgUrl} alt="plate" width="234px" height="150px" />}
        placement="right"
      >
        <a href={imgUrl} target="_blank" rel="noreferrer">
          {text}
        </a>
      </Tooltip>
    );
  };

  const renderLogTime = (text) => {
    const formattedTime = moment(text).format("MMM DD, YYYY hh:mm A");
    console.log(text, formattedTime);
    return <span>{formattedTime}</span>;
  };

  return [
    {
      title: "Log Id",
      dataIndex: "log_id",
      key: "log_id",
    },
    {
      title: "Lot Id",
      dataIndex: "lot_id",
      key: "lot_id",
    },
    {
      title: "Log Time",
      dataIndex: "log_time",
      key: "log_time",
      render: renderLogTime,
    },
    {
      title: "Plate Number",
      dataIndex: "plate_number",
      key: "plate_number",
      render: renderPlateNumber,
    },
    {
      title: "car_make",
      dataIndex: "car_make",
      key: "car_make",
    },
    {
      title: "car_model",
      dataIndex: "car_model",
      key: "car_model",
    },
    {
      title: "car_type",
      dataIndex: "car_type",
      key: "car_type",
    },
    {
      title: "car_color",
      dataIndex: "car_color",
      key: "car_color",
    },
  ];
};

export default LogsColumns;
