import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function UserDeleted() {
    const { logout } = useAuth();

    return(
        <div className="flex flex-col gap-8 w-full">
            <h2 className="text-2xl text-center font-bold">¡Hasta Pronto!</h2>
            <p>El Usuario se Eliminó correctamente. Gracias por elegirnos y esperamos Regreses!.</p>
            <Link to="/" className="bg-green-400 p-2 text-white text-center" onClick={ logout }>Aceptar</Link>
        </div>
    );
}