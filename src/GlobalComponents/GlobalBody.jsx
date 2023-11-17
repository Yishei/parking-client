import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { MessageContext } from "../Context/MessageContext";

const GlobalBody = () => {
  const { contextHolder } = useContext(MessageContext);
  return (
    <>
      {contextHolder}
      <Outlet />
    </>
  );
};

export default GlobalBody;
