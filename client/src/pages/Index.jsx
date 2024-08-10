import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import Player from "./../components/Player";

export const IsLoggedContext = createContext();

function Index() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <IsLoggedContext.Provider value={isLogged}>
      <div className="flex h-screen min-h-150 w-full min-w-193 flex-col gap-2 bg-backFiller p-2">
        <div className="flex h-full w-full gap-2">
          <Sidebar />
          <Outlet />
        </div>
        <Player isLog={isLogged} />
      </div>
    </IsLoggedContext.Provider>
  );
}

export default Index;
