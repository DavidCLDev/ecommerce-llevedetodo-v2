import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SimpleLayout from '../layouts/SimpleLayout';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home';
import Registro from '../pages/Registro';
import Compras from '../pages/Compras';
import ComprasPreguntas from '../pages/ComprasPreguntas';
import ComprasOpiniones from '../pages/ComprasPreguntas';
import ComprasFavoritos from '../pages/ComprasPreguntas';

import Ventas from '../pages/Ventas';
import VentasPublicaciones from '../pages/VentasPublicaciones';
import VentasPreguntas from '../pages/VentasPreguntas';

import Perfil from '../pages/Perfil';
import EliminarUsuario from '../pages/EliminarUsuario';
import DatosUsuario from '../pages/DatosUsuario';
import ModificarDato from '../pages/ModificarDato';

import Direcciones from '../pages/Direcciones';
import AgregarDireccion from '../pages/AgregarDireccion';
import Facturacion from '../pages/Facturacion';
import Ajustes from '../pages/Ajustes';

import PublicRoute from '../routes/PublicRoute';
import PrivateRoute from '../routes/PrivateRoute';
import AccountLayout from '../layouts/AccountLayout';
import EditarDireccion from '../pages/EditarDireccion';


export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <MainLayout /> }>
                <Route index element={ <Home /> }></Route>
                <Route path="cuenta" element= {
                    <PrivateRoute>
                    <AccountLayout />
                    </PrivateRoute>
                }>
                    {/* RUTAS DE Compras */}
                    <Route path="compras/lista" element={ <Compras />}></Route>
                    <Route path="compras/preguntas" element={ <ComprasPreguntas /> }></Route>
                    <Route path="compras/opiniones" element={ <ComprasOpiniones /> }></Route>
                    <Route path="compras/favoritos" element={ <ComprasFavoritos /> }></Route>

                    {/* RUTAS DE Ventas */}
                    
                    <Route path="ventas/resumen" element={ <Ventas />}></Route>
                    <Route path="ventas/publicaciones" element={ <VentasPublicaciones /> }></Route>
                    <Route path="ventas/preguntas" element={ <VentasPreguntas /> }></Route>

                    {/* RUTAS DE Perfil */}
                    <Route path="perfil" element={ <Perfil /> }></Route>

                    <Route path="perfil/informacion" element={ <DatosUsuario />}></Route>
                    <Route path="perfil/informacion/:tipo" element={ <ModificarDato />}></Route>

                    <Route path="perfil/direcciones" element={ <Direcciones /> } />
                    <Route path="/cuenta/perfil/direcciones/:id" element={ <EditarDireccion />} />
                    <Route path="perfil/direcciones/agregar" element={ <AgregarDireccion /> }></Route>

                    <Route path="facturas" element={ <Facturacion /> }></Route>
                    <Route path="ajustes" element={ <Ajustes /> }></Route>
                </Route>
                </Route>

                <Route element={ <SimpleLayout /> }>
                <Route path="registrar" element={ 
                    <PublicRoute>
                    <Registro />
                    </PublicRoute>
                }>
                </Route>
                
                <Route path="cuenta/perfil/eliminar" element={
                    <PrivateRoute>
                    <EliminarUsuario />
                    </PrivateRoute>}>
                </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}