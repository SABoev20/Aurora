import HomeAndSearch from "./HomeAndSearch";
import Library from "./Library";
import useToggle from "./../hooks/useToggle.js";
import { createContext } from "react";

export const LibraryToggle = createContext();

function Sidebar() {
  const { toggle, changeToggle } = useToggle();

  return (
    <LibraryToggle.Provider value={{ toggle, changeToggle }}>
      <nav
        className={"flex h-full w-106 flex-col gap-2 " + (toggle ? "w-20" : "")}
      >
        <HomeAndSearch />
        <Library />
      </nav>
    </LibraryToggle.Provider>
  );
}

export default Sidebar;
