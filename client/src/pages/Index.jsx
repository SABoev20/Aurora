import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Player from "./../components/Player";
import IndexContentWindowWrapper from "../components/IndexContentWindowWrapper";

function Index() {
  return (
    <div className="flex h-screen min-h-150 w-full min-w-193 flex-col gap-2 bg-backFiller p-2">
      <div className="flex h-full w-full gap-2">
        <Sidebar />
        <IndexContentWindowWrapper>
          <Outlet />
        </IndexContentWindowWrapper>
      </div>
      <Player />
    </div>
  );
}

export default Index;
