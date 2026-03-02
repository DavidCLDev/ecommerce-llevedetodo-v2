import { useState } from 'react';

import TextInput from "./TextInput";

export default function RegisterForm() {

    const [formData, setFormData] = useState({
        name: "",
        lastname:"",
        email: "",
        phone: "",
        onChange: e =>
            setFormData(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
    })

    const registerInputs = [
    {
        name: "name",
        type: "text",
        placeholder: "Nombre",
        autoComplete:"username",
    },
    {
        name: "lastname",
        type: "text",
        placeholder: "Apellido",
        autoComplete:"username",
    },
    {
        name: "email",
        type: "email",
        placeholder: "correo electrónico",
        autoComplete: "username",
    },
    {
        name: "phone",
        type: "tel",
        placeholder: "número de celular",
        autoComplete: "tel-national",
        pattern: "[0-9]",
        inputMode: "numeric"
    },
    {
        name: "userName",
        type: "text",
        placeholder: "nombre de usuario",
        autoComplete: "username",
        className: "col-span-full"
    },
    {
        name: "password",
        type: "passwrod",
        placeholder: "contraseña",
        autoComplete: "current-password",
        className: "col-span-full"
    }];

    return (
        <form className="grid grid-cols-2 gap-6">
            {
                registerInputs.map((input) => <TextInput {...input} className={input.className} key={input.name} />)
            }
            <button type="submit" className='col-span-full p-3 bg-red-400 text-white cursor-pointer rounded-sm'>Registrarme</button>
        </form>
    );
}