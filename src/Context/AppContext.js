import { createContext, useState } from "react";
import { HomeBreadcrumb } from "../utilities/HeaderBreadcrumbs";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const defaultBreadcrumb = HomeBreadcrumb();
  const [appInnerHeadContent, setAppInnerHeadContent] =
    useState(defaultBreadcrumb);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const value = {
    loading,
    setLoading,
    appInnerHeadContent,
    setAppInnerHeadContent,
    isMenuOpen,
    setIsMenuOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
