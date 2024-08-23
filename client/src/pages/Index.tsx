import Sidebar from "../components/Sidebar.js";
import { Outlet } from "react-router-dom";
import Player from "../components/Player.js";
import IndexContentWindowWrapper from "../components/IndexContentWindowWrapper.js";
import { LoggedUserProvider } from "../contexts/LoggedUserProvider.js";
import { LibraryToggleProvider } from "../contexts/LibraryToggleProvider.js";
import refreshTokenService from "../services/refreshTokenService.js";
import axios, { AxiosError, AxiosResponse } from "axios";
const refreshSer = new refreshTokenService();
interface ErrorResponse {
  error: string;
  message: string;
}
function Index() {
  const checkifUserIsLogged = async () => {
    try {
      const refreshResponse = await refreshSer.refresh();

      if (refreshResponse.status === 200) {
        return true;
      }

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
            alert(`Error: ${errorData.message}`);
          } else {
            alert("An unexpected error occurred.");
          }
        } else if (axiosError.request) {
          // Request was made but no response was received
          console.log("No response received:", axiosError.request);
          alert("No response received from the server.");
        }
      } else {
        // Handle non-Axios error
        console.log("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  checkifUserIsLogged().then((isLoggedIn) => {
    if (isLoggedIn) {
      console.log(true);
    } else {
      console.log(false);
    }
  });

  return (
    <LoggedUserProvider>
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
    </LoggedUserProvider>
  );
}

export default Index;
