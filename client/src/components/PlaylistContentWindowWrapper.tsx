import Sidebar from "../components/Sidebar.js";
import { Outlet } from "react-router-dom";
import Player from "../components/Player.js";
import { LoggedUserProvider } from "../contexts/LoggedUserProvider.js";
import { LibraryToggleProvider } from "../contexts/LibraryToggleProvider.js";

function PlaylistContentWindowWrapper() {
  return (
    <LoggedUserProvider>
      <div className="relative flex h-screen min-h-150 w-full min-w-193 flex-col gap-2 bg-backFiller p-2">
        <div className="flex h-full w-full gap-2">
          <LibraryToggleProvider>
            <Sidebar />
          </LibraryToggleProvider>
          <Outlet />
        </div>
        <Player />
      </div>
    </LoggedUserProvider>
  );
}
export default PlaylistContentWindowWrapper;
