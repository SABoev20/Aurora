import React, { createContext, useState } from "react";
import useToggle from "../hooks/useLibraryToggle";

const LibraryToggleContext = createContext();

const LibraryToggleProvider = ({ children }) => {
  const { toggle, changeToggle } = useToggle();

  return (
    <LibraryToggleContext.Provider value={{ toggle, changeToggle }}>
      {children}
    </LibraryToggleContext.Provider>
  );
};

export { LibraryToggleContext, LibraryToggleProvider };
