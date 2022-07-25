import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Alquran from "./components/Alquran";
import Doa from "./components/Doa";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/quran' element={<Alquran />}></Route>
        <Route path='/doa' element={<Doa />}></Route>
      </Routes>
    </div >
  )
}

export default App