import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Doa from "./components/Doa";
import { Container } from '@chakra-ui/react';

function App() {
  return (
    <div>
      <Navbar />
      <Container maxW='container.xl' my={'30px'}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/doa' element={<Doa />}></Route>
        </Routes>
      </Container>
    </div >
  )
}

export default App