import { createContext } from "react";

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  let user;

  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <UserContext.Provider value={{ getUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
