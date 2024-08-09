import Sidebar from "../components/sidebar/Sidebar";
import MainContent from "../components/MainContent";
import { Outlet, Route, Routes } from "react-router-dom";

function Index() {
  return (
    <div className="bg-backFiller min-w-193 min-h-150 flex h-screen w-full flex-col gap-2 p-2">
      <div className="flex h-full w-full gap-2">
        <Sidebar />
        <Outlet />
      </div>
      <div className="bg-backBase h-20 w-full"></div>
    </div>
  );
}

export default Index;
