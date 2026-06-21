import { Link } from "react-router-dom";

import UserPanelCard from "../components/UserPanelCard";
import { faLocationDot, faAddressCard, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";

export default function Perfil() {

    const { user } = useAuth();

    // Aquí se ponen las opciones a las que tiene acceso el usuario en su panel de perfil
    const userCards = [
        {header: "Datos de tu cuenta", description: "Información que representa a tu cuenta de llevedetodo", icon: faAddressCard, ruta: "informacion"},
        {header: "Direcciones", description: "Direcciones asignadas a tu cuenta", icon: faLocationDot, ruta: "direcciones"},
        {header: "Tarjetas", description: "Tarjetas guardadas en tu cuenta", icon: faCreditCard, ruta: "tarjetas"}
    ];

    return (
        // Cambiar div según la necesidad
        <div className="w-full min-h-195 px-75 py-15">
            <div className="flex flex-col gap-10 size-full">
                <div className="flex justify-between items-center bg-amber-50 p-3 rounded-sm">
                    <header>
                        <h1 className="text-xl font-bold">{user.username}</h1>
                        <p className="text-sm">{user.email}</p>
                    </header>
                    <Link to="/cuenta/perfil/eliminar" className="text-sm text-zinc-500 underline">Eliminar cuenta</Link>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    {
                        userCards.map( (elem, index) => <UserPanelCard key={ index } atributes={ elem } /> )
                    }
                </div>
            </div>
        </div>
    );
}