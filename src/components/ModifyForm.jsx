import { useState } from "react";

import { useForm } from "../hooks/useForm";
import { useAuth } from "../hooks/useAuth";
import { updateUserData } from "../services/userService";

import TextInput from "./TextInput";
import Modal from "../components/Modal";
import ConfirmationPrompt from "./ConfirmationPrompt";
import { useNavigate } from "react-router-dom";

export default function ModifyForm({type}) {

    const navigate = useNavigate();

    const { user, setUser } = useAuth();
    const [isOpen, setOpen] = useState(false);

    const config = {
        "nombre-usuario": [
            {
                label: "Nombre de usuario",
                name: "username",
                type: "text",
                autoComplete: "username"
            }
        ],
        correo: [
            {
                label: "Correo",
                type: "email",
                name: "email",
            }
        ],
        nombres: [
            {
                label: "Nombre",
                name: "firstname",
                type: "text"
            },
            {
                label: "Apellido",
                name: "lastname",
                type: "text"
            }
        ],
        celular: [
            {
                label: "Celular",
                name: "phone",
                type: "tel"
            }
        ]
    }

    const fields = config[type];

    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {});

    const { formData, handleChange, handleSubmit } = useForm({...initialValues}, submitForm);

    fields.map((field) => {
        field.value = formData[field.name];
        field.onChange = e => handleChange(e);
    })

    async function submitForm(formData) {
        try {
            const updatedUser = await updateUserData(formData);

            if (updatedUser) {
                setOpen(true);
                setUser(updatedUser);
            }
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="flex flex-col gap-8" autoComplete="off" onSubmit={ handleSubmit }>
                {
                    fields.map((field, index) => {
                        return (
                            <div key={ index } className="flex flex-col gap-2">
                                <label htmlFor="confirmPass">{ field.label }:</label>
                                <TextInput className="p-2 bg-white" {...field} />
                            </div>
                        );
                    })
                }
                <button
                className="self-end w-40 p-2 bg-yellow-400 text-white
                rounded-sm cursor-pointer focus:outline-none focus:ring-2
                focus:ring-cyan-500"
                >Modificar</button>
            </form>
        
            { isOpen && (
                <Modal onClose={() => navigate("/cuenta/perfil/informacion")}>
                    <ConfirmationPrompt
                    header="Campo actualizado"
                    description="Se actualizó correctamente el campo."
                    onAccept={() => navigate("/cuenta/perfil/informacion")}
                    />
                </Modal>
            )}
        </>
    );
}