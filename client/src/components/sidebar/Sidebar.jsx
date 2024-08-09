import HomeAndSearch from "./HomeAndSearch";
import Library from "./Library";

function Sidebar() {
  return (
    <nav className="w-106 flex h-full flex-col gap-2">
      <HomeAndSearch />
      <Library />
    </nav>
  );
}

export default Sidebar;
