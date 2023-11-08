import { createContext } from "react";
import { message } from "antd";

export const MessageContext = createContext({});

export const MessageContextProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const msg = (type, msg) => {
    messageApi.open({
      key: "updatable",
      type: type,
      content: msg,
      duration: type === "loading" ? 0 : 2,
    });
  };

  const closeMsg = () => {
    messageApi.destroy();
  };

  const values = {
    messageApi,
    contextHolder,
    msg,
    closeMsg,
  };

  return (
    <MessageContext.Provider value={values}>{children}</MessageContext.Provider>
  );
};

export default MessageContext;
