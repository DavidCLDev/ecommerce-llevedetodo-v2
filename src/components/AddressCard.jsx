import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default function AddressCard({
    exactAddress, department, municipality, fullName, phone, onDeleteAddress, id
}) {

    function destroyCard() {
        delete this;
    }

    return (
        <div className="bg-amber-50 p-6 rounded-sm relative">
            <button 
            className="
            absolute top-3 right-3 bg-red-500 rounded-sm
            text-white p-1 cursor-pointer"
            onClick={ onDeleteAddress }>
                <FontAwesomeIcon icon={ faTrashCan } size="lg" />
            </button>
            <div className="flex flex-col mb-4 justify-center gap-2">
                <div>
                    <p className="font-bold text-lg">{ exactAddress }</p>
                    <p className="text-sm text-stone-400">{ department } - { municipality }</p>
                </div>
                <p className="text-xs text-stone-400">{ fullName } - { phone }</p>
            </div>
            <Link to={ `/cuenta/perfil/direcciones/${id}`} className="text-amber-500 font-bold">
                <p className="inline mr-1">Editar dirección</p>
                <FontAwesomeIcon icon={ faPenToSquare } />
            </Link>
        </div>
    );
}