import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import { useForm } from "../hooks/useForm";
import { deleteItem } from "../services/deleteData";
import { useAuth } from "../hooks/useAuth";
import Modal from "../components/Modal";

import UserDeleted from "./UserDeleted";

export default function DeleteUserForm() {

    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const { formData, handleChange, handleSubmit } = useForm({ confirmPass: "" }, submitForm);

    async function submitForm(formData) {
        try {
            const token = localStorage.getItem('token');
            
            const response = await deleteItem(`usuario/${user.id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (response.status === 204) {
               setOpen(true);
            }
            
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
            <form className="flex flex-col gap-8" autoComplete="off" onSubmit={ handleSubmit }>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPass">Digita tu contraseña para continuar con la eliminación de la cuenta:</label>
                    <TextInput className="p-2" type="password" name="confirmPass" autoComplete="new-password" value={ formData.confirmPass } onChange={ handleChange } />
                </div>
                <button className="self-end w-40 p-2 bg-red-400 text-white rounded-sm cursor-pointer">Eliminar cuenta</button>
            </form>

            {isOpen && (
                <Modal onClose={ () => {logout(); navigate("/");} }>
                    <UserDeleted />
                </Modal>
            )}
        </>
    );
}