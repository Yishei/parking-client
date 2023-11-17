import { Tooltip } from "antd";
import moment from "moment";
import urls from "../../utilities/urls.json";

const stringCapitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const renderPicDiv = (text, record) => {
  const urlExtensions =
    text === record.plate_number ? urls.get.platePicture : urls.get.carPicture;
  const imgUrl = `${urls.baseURl}${urlExtensions}${record.log_id}?w=235&h=150`;
  let string = text.length === 3 ? text.toUpperCase() : stringCapitalize(text);
  return (
    <Tooltip
      title={<img src={imgUrl} alt="img" width="235px" height="150px" />}
      placement="right"
    >
      <a href={imgUrl} target="_blank" rel="noreferrer">
        {string}
      </a>
    </Tooltip>
  );
};

const renderLogTime = (text) => {
  const formattedTime = moment(text).format("MMM DD, YYYY hh:mm A");
  console.log(text, formattedTime);
  return <span>{formattedTime}</span>;
};

const renderModel = (text, record) => {
  const words = text.split("_").filter((word) => word !== record.car_make);
  return words.map((word) => stringCapitalize(word)).join(" ");
};

const renderTypeAndColor = (text) => {
  const words = text.split("-");
  return words.map((word) => stringCapitalize(word)).join(" ");
};

const LogsColumns = () => {
  return [
    {
      title: "Log Id",
      dataIndex: "log_id",
      key: "log_id",
      width: "10%",
      sorter: (a, b) => a.log_id - b.log_id,
    },
    {
      title: "Log Time",
      dataIndex: "log_time",
      key: "log_time",
      render: renderLogTime,
      width: "15%",
      sorter: (a, b) => new Date(a.log_time) - new Date(b.log_time),
    },
    {
      title: "Plate",
      dataIndex: "plate_number",
      key: "plate_number",
      render: renderPicDiv,
      width: "10%",
      sorter: (a, b) => a.plate_number.localeCompare(b.plate_number),
    },
    {
      title: "Car Make",
      dataIndex: "car_make",
      key: "car_make",
      render: renderPicDiv,
      width: "15%",
      sorter: (a, b) => a.car_make.localeCompare(b.car_make),
    },
    {
      title: "Car Model",
      dataIndex: "car_model",
      key: "car_model",
      render: renderModel,
      width: "15%",
      sorter: (a, b) => a.car_model.localeCompare(b.car_model),
    },
    {
      title: "Car Type",
      dataIndex: "car_type",
      key: "car_type",
      render: renderTypeAndColor,
    },
    {
      title: "Car Color",
      dataIndex: "car_color",
      key: "car_color",
      render: renderTypeAndColor,
    },
  ];
};

export default LogsColumns;
