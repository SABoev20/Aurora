import Index from "./pages/Index";
import Login from "./pages/Login";
import HomeContent from "./components/HomeContent";
import Search from "./components/Search";
import Signup from "./pages/Signup";
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
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
export default App;
