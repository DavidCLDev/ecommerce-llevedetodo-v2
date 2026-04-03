import { useState, useEffect } from "react";
import UserDataCard from "../components/UserDataCard";
import { useAuth } from "../hooks/useAuth";

import { userService } from "../services/userService";

export default function DatosUsuario() {

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    const { user } = useAuth();

    useEffect(() => {

        async function fetchData() {
            if (!user?.id) return;

            try {
                const token = localStorage.getItem("token");
    
                const response = await userService(`usuario/${user.id}`, {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                if (response && response.status == 200) {
                    const data = await response.json();
    
                    setFullName(user.name + " " + data.lastname);
                    
                    setPhone(data.phone);
                }
            } catch(error) {
                console.log(error);
            }
        }

        fetchData();
    }, [user]);

    const fields = [
        {name: "Nombre de usuario", value: user.username, path: "nombre-usuario"},
        {name: "Email", value: user.email, path:"correo"},
        {name: "Nombre y apellido", value: fullName, path:"nombres"},
        {name: "Celular", value: phone, path:"celular"}
    ];

    return (
        <div className="flex justify-center py-10 min-h-195">
            <div className="flex flex-col gap-4 w-1/2 bg-amber-100 p-8 rounded-sm">
                <header className="text-center">
                    <h1 className="text-xl font-bold">Datos de la cuenta</h1>
                </header>
                {
                    fields.map((field, index) => <UserDataCard key={ index } name={ field.name } value={ field.value } path={ field.path } />)
                }
            </div>
        </div>
    );
}