import { Link } from "react-router-dom"

export default function LoginRegister({ onOpen }) {
    return (
        <>
            <button onClick= { onOpen } className=" p-4 rounded-xl bg-zinc-50 cursor-pointer">Iniciar Sesión</button>
            <Link to="registrar" className=" p-4 rounded-xl bg-zinc-50">Registrarse</Link>
        </>
    )
}