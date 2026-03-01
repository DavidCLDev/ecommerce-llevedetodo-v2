import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Logo from '../assets/images/lleveDTodo.png';

import SearchBar from "./SearchBar";
import LoginRegister from "./LoginRegister";
import UserButtons from "./UserButtons";

import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function Header({ onOpen }) {

    const { user, authLoading } = useAuth();

    // Opciones de menú general
    const options = [
        {id:"categorias", label:"Todas las categorías"},
        {id:"ofertas", label:"Packs de ofertas"},
        {id:"choice", label:"Choice"},
        {id:"motor", label:"Motor"},
        {id: "jardin", label: "Jardín y Hogar"}
    ];


    return (
    <header className="z-50">
        <nav className="w-full bg-zinc-50 px-25 pt-6 pb-4 space-y-2">
            <div className="flex justify-between items-center">
                <div className="w-55">
                    <Link to="/"><img src={ Logo } alt="Lleve de todo"/></Link>
                </div>
                <SearchBar />
                <div className="flex w-70 justify-between">
                    {
                        authLoading ? (null) :
                        user ? (<UserButtons />) : (<LoginRegister onOpen={ onOpen } />)
                    }
                </div>
            </div>
            <div className="px-12">
                <ul className="flex justify-between">
                    {
                    options.map((option) => {
                        return (
                            <li key={option.id}>
                                <button className="w-50 py-4 cursor-pointer rounded-xl hover:bg-gray-100">
                                    { option.label }
                                    { option.id === "categorias" && <FontAwesomeIcon icon={ faChevronDown } /> }
                                </button>
                            </li>
                        );
                    })
                    }
                </ul>
            </div>
        </nav>
    </header>
    );
}