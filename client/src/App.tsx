import Index from "./pages/Index";
import Login from "./pages/Login";
import HomeContent from "./components/HomeContent";
import Search from "./components/Search";
import Signup from "./pages/Signup";
import { Route, Routes } from "react-router-dom";
import OpenPlaylist from "./components/OpenPlaylist";
import PlaylistContentWindowWrapper from "./components/PlaylistContentWindowWrapper";
import { LoggedUserProvider } from "./contexts/LoggedUserProvider";
import GithubOAuth from "./pages/GithubOAuth2";
function App() {
  return (
    <>
      <LoggedUserProvider>
        <Routes>
          <Route path="/" element={<Index />}>
            <Route index element={<HomeContent />}></Route>
            <Route path="/search" element={<Search />}></Route>
          </Route>
          <Route element={<PlaylistContentWindowWrapper />}>
            <Route path="/playlist/:id" element={<OpenPlaylist />}></Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth2/callback" element={<GithubOAuth />} />
        </Routes>
      </LoggedUserProvider>
    </>
  );
}
export default App;
