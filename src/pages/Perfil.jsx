import { Link } from "react-router-dom";

import UserPanelCard from "../components/UserPanelCard";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuth";

export default function Perfil() {

    const { user } = useAuth();

    return (
        // Cambiar div según la necesidad
        <div className="w-full h-200 px-75 py-15">
            <div className="flex flex-col gap-10 size-full">
                <div className="flex justify-between items-center bg-amber-50 p-3 rounded-sm">
                    <header>
                        <h1 className="text-xl font-bold">{user.username}</h1>
                        <p className="text-sm">{user.email}</p>
                    </header>
                    <Link to="/cuenta/perfil/eliminar" className="text-sm text-zinc-500 underline">Eliminar cuenta</Link>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    <UserPanelCard header="Dirección" description="Direcciones asignadas a tu cuenta" icon={ faLocationDot } ruta="direcciones" />
                    <UserPanelCard header="Dirección" description="Direcciones asignadas a tu cuenta" icon={ faLocationDot } ruta="direcciones" />
                    <UserPanelCard header="Dirección" description="Direcciones asignadas a tu cuenta" icon={ faLocationDot } ruta="direcciones" />
                    <UserPanelCard header="Dirección" description="Direcciones asignadas a tu cuenta" icon={ faLocationDot } ruta="direcciones" />
                </div>
            </div>
        </div>
    );
}