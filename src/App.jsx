import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./components/Home";
import Alquran from "./components/Alquran";
import Doa from "./components/Doa";
import Tahlil from "./components/Tahlil";
import { useEffect } from "react";
function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/quran' element={<Alquran />}></Route>
        <Route path='/doa' element={<Doa />}></Route>
        <Route path='/tahlil' element={<Tahlil />}></Route>
      </Routes>
    </div >
  )
}

export default App