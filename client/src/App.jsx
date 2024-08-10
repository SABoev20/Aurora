import { NavLink, Route, Routes } from "react-router-dom";
import Index from "./pages";
import Login from "./pages/Login";
import MainContent from "./components/MainContent";
import Search from "./components/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />}>
        <Route index element={<MainContent />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
