import HomeAndSearch from "./HomeAndSearch.js";
import Library from "./Library.js";
import { useContext } from "react";
import { LibraryToggleContext } from "../contexts/LibraryToggleProvider.js";

function Sidebar() {
  const { toggle } = useContext(LibraryToggleContext);
  return (
    <nav
      className={"flex h-full w-106 flex-col gap-2 " + (toggle ? "w-20" : "")}
    >
      <HomeAndSearch />
      <Library />
    </nav>
  );
}

export default Sidebar;
