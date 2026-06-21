import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserAddresses, deleteAddress } from "../services/addressService";
import { useAuth } from "../hooks/useAuth";

import AddressCard from "../components/AddressCard";

export default function Direcciones() {

    const { user } = useAuth();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const cargarDirecciones = async () => {
            const response = await fetchUserAddresses(user.id);

            const data = await response.json();

            if (data) {
                setAddresses(data);
            }
        };

        cargarDirecciones();
    }, []);

    async function removeAddress(id) {
        const response = await deleteAddress(id);

        if (response.ok) {
            const newList = addresses.filter((l) => l.id !== id);
            setAddresses(newList);
        }

    }

    return (
        <div className="w-full min-h-195 px-100 py-15">
            <div className="px-12 py-10 bg-amber-100 rounded-sm">
                <div className="flex flex-col gap-6">
                    <header>
                        <h1 className="text-2xl font-bold">Direcciones</h1>
                    </header>
                    <section className="flex flex-col gap-4">
                        {
                            addresses.map((address) => {
                                return (
                                <AddressCard
                                key={ address.id }
                                id={ address.id }
                                exactAddress={ address.exactAddress }
                                department={ address.department }
                                municipality={ address.municipality }
                                fullName={ address.owner }
                                phone={ address.phone }
                                onDeleteAddress={ () => {removeAddress(address.id) } }/>
                            );
                            })
                        }
                    </section>
                    <Link to="agregar" className="py-3 bg-green-400 text-white text-center font-bold cursor-pointer rounded-sm">
                        + Agregar nueva dirección
                    </Link>
                </div>
            </div>
        </div>
    );
}