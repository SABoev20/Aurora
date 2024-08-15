import React, { createContext, useState } from "react";
import useLoggedUser from "../hooks/useLoggedUser.js";

const LoggedUserContext = createContext();

const LoggedUserProvider = ({ children }) => {
  const { isLogged } = useLoggedUser();

  return (
    <LoggedUserContext.Provider value={{ isLogged }}>
      {children}
    </LoggedUserContext.Provider>
  );
};

export { LoggedUserContext, LoggedUserProvider };
