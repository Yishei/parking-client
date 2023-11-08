import { createContext, useState } from "react";
import { HomeBreadcrumb } from "../utilities/HeaderBreadcrumbs";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const defaultBreadcrumb = HomeBreadcrumb();
  const [appInnerHeadContent, setAppInnerHeadContent] =
    useState(defaultBreadcrumb);

  const value = {
    loading,
    setLoading,
    appInnerHeadContent,
    setAppInnerHeadContent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
