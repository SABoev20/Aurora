import Sidebar from "../components/Sidebar.js";
import { Outlet } from "react-router-dom";
import Player from "../components/Player.js";
import IndexContentWindowWrapper from "../components/IndexContentWindowWrapper.js";
import { LoggedUserProvider } from "../contexts/LoggedUserProvider.js";

import refreshTokenService from "../services/refreshTokenService.js";
import axios, { AxiosError, AxiosResponse } from "axios";
import { LoggedUserContext } from "../contexts/LoggedUserProvider.js";
import { useContext } from "react";
import { useEffect } from "react";
import { LibraryToggleProvider } from "../contexts/LibraryToggleProvider.js";
const refreshSer = new refreshTokenService();

interface ErrorResponse {
  error: string;
  message: string;
}
function Index() {
  const { isLogged, changeIsLogged } = useContext(LoggedUserContext);

  const checkifUserIsLogged = async () => {
    try {
      const refreshResponse = await refreshSer.refresh();

      if (refreshResponse.status === 200) {
        changeIsLogged(true);
        return true;
      }
      changeIsLogged(false);
      return false;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Axios-specific error
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          // Server responded with a status other than 2xx
          const errorData = axiosError.response.data;
          console.log("Error data:", errorData);
          console.log("Error status:", axiosError.response.status);

          // Display the message from the response
          if (errorData?.message) {
            console.log(`Error: ${errorData.message}`);
          } else {
            console.log("An unexpected error occurred.");
          }
        } else if (axiosError.request) {
          // Request was made but no response was received
          console.log("No response received:", axiosError.request);
          console.log("No response received from the server.");
        }
      } else {
        // Handle non-Axios error
        console.log("Unexpected error:", error);
        console.log("An unexpected error occurred.");
      }
    }
  };
  useEffect(() => {
    checkifUserIsLogged();
  }, []);
  return (
    <div className="relative flex h-screen min-h-150 w-full min-w-193 flex-col gap-2 bg-backFiller p-2">
      <div className="flex h-full w-full gap-2">
        <LibraryToggleProvider>
          <Sidebar />
        </LibraryToggleProvider>
        <IndexContentWindowWrapper>
          <Outlet />
        </IndexContentWindowWrapper>
      </div>
      <Player />
    </div>
  );
}

export default Index;
