import Index from "./pages";
import Login from "./pages/Login";
import HomeContent from "./components/HomeContent";
import Search from "./components/Search";
import Signup from "./pages/Signup";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<HomeContent />}></Route>
          <Route path="/search" element={<Search />}></Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
