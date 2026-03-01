import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SimpleLayout from './layouts/SimpleLayout';
import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import Registro from './pages/Registro';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <MainLayout /> }>
          <Route index element={ <Home /> }></Route>
        </Route>

        <Route element={ <SimpleLayout /> }>
          <Route path="registrar" element={ <Registro /> }></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
