import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./components/Home";
import Alquran from "./components/quran/Alquran";
import Detail from "./components/quran/Detail";
import Doa from "./components/Doa";
import Tahlil from "./components/Tahlil";
import Asma from "./components/Asma";
import Jadwal from "./components/Jadwal";
import Berita from "./components/Berita";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useColorModeValue } from "@chakra-ui/react";
import { ArrowUpIcon } from '@chakra-ui/icons'
import './assets/style/style.css';
function App() {
  // initial
  const { pathname } = useLocation();

  const [visible, setVisible] = useState(false)

  // if page scroll will show icon
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true)
    }
    else if (scrolled <= 300) {
      setVisible(false)
    }
  };

  // handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    window.addEventListener('scroll', toggleVisible);
  }, [pathname]);
  return (
    <div>
      <Navbar />
      <div className="top-to-btm" onClick={scrollToTop}>
        <ArrowUpIcon bg={useColorModeValue('blue.700', 'white')} borderColor='black' color={useColorModeValue('white', 'blue.700')} className="icon-position icon-style" h='8' w='8' style={{ display: visible ? 'inline' : 'none' }} />
      </div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/quran' element={<Alquran />}></Route>
        <Route path='/quran/:id' element={<Detail />}></Route>
        <Route path='/doa' element={<Doa />}></Route>
        <Route path='/tahlil' element={<Tahlil />}></Route>
        <Route path='/asmaulhusna' element={<Asma />}></Route>
        <Route path='/jadwal' element={<Jadwal />}></Route>
        <Route path='/berita' element={<Berita />}></Route>
      </Routes>
      <Footer />
    </div >
  )
}

export default App