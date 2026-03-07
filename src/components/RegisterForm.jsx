import TextInput from "./TextInput";

import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

import { authFetch } from '../services/fetchData';

export default function RegisterForm({ onRegisterSuccess }) {

    const { login } = useAuth();

    const { formData, handleChange, handleSubmit } = useForm({
        name: "",
        lastname:"",
        email: "",
        phone: "",
        username: "",
        password: ""
    }, submitForm);

    const registerInputs = [
    {
        name: "name",
        type: "text",
        value: formData.name,
        placeholder: "Nombre",
        autoComplete:"username",
        onChange: e => handleChange(e)
    },
    {
        name: "lastname",
        type: "text",
        value: formData.lastname,
        placeholder: "Apellido",
        autoComplete:"username",
        onChange: e => handleChange(e)
    },
    {
        name: "email",
        type: "email",
        value: formData.email,
        placeholder: "correo electrónico",
        autoComplete: "username",
        onChange: e => handleChange(e)
    },
    {
        name: "phone",
        type: "tel",
        value: formData.phone,
        placeholder: "número de celular",
        autoComplete: "tel-national",
        onChange: e => handleChange(e),
        pattern: "3[0-9]{9}",
        inputMode: "numeric"
    },
    {
        name: "username",
        type: "text",
        value: formData.username,
        placeholder: "nombre de usuario",
        autoComplete: "username",
        onChange: e => handleChange(e),
        className: "col-span-full"
    },
    {
        name: "password",
        type: "password",
        value: formData.password,
        placeholder: "contraseña",
        autoComplete: "current-password",
        onChange: e => handleChange(e),
        className: "col-span-full"
    }];

    async function submitForm(formData) {
            try {
                const response = await authFetch('register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
    
                const data = await response.json();
            
                if (response.status === 201) {
                    login(data);
                    
                    onRegisterSuccess();
                }
            } catch(error) {
                console.log("Error");
            }
        }

    return (
        <form className="grid grid-cols-2 gap-6" onSubmit={ handleSubmit }>
            {
                registerInputs.map((input) => <TextInput {...input} className={input.className} key={input.name} />)
            }
            <button type="submit" className='col-span-full p-3 bg-red-400 text-white cursor-pointer rounded-sm'>Registrarme</button>
        </form>
    );
}