import HomeAndSearch from "./HomeAndSearch";
import Library from "./Library";

function Sidebar() {
  return (
    <nav className="flex h-full w-106 flex-col gap-2">
      <HomeAndSearch />
      <Library />
    </nav>
  );
}

export default Sidebar;
