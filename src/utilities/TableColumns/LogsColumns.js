import { Tooltip } from "antd";
import moment from "moment";
import urls from "../../utilities/urls.json";

const stringCapitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const renderPicDiv = (text, record) => {
  const urlExtensions =
    text === record.plate_number ? urls.get.platePicture : urls.get.carPicture;
  const imgUrl = `${urls.baseURl}${urlExtensions}${record.log_id}`;
  let string = text.length === 3 ? text.toUpperCase() : stringCapitalize(text);
  return (
    <Tooltip
      title={<img src={imgUrl} alt="img" width="234px" height="150px" />}
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
      render: renderPicDiv,
    },
    {
      title: "Car Make",
      dataIndex: "car_make",
      key: "car_make",
      render: renderPicDiv,
    },
    {
      title: "Car Model",
      dataIndex: "car_model",
      key: "car_model",
      render: renderModel,
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
