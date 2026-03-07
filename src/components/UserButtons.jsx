import { useState } from "react";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import IconButton from './IconButton';
import UserMenu from "./UserMenu";

export default function UserButtons() {
    // Variable y función que maneja el estado del menú de usuario
    const [userMenu, setUserMenu] = useState(false);

    return (
        <>
            <div className="inline-block relative" onMouseEnter={ () => setUserMenu(true) } onMouseLeave={ () => setUserMenu(false) }>
                <IconButton icon={ faUser } text="Tu Cuenta" />
                {
                    userMenu && <UserMenu />
                }
            </div>
            <div className="inline-block">
                <IconButton icon={ faCartShopping } text="Carrito" />
            </div>
        </>
    );
}