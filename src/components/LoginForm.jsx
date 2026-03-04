import TextInput from './TextInput';

import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';

import { authFetch } from '../services/fetchData';

export default function LoginForm({ onLoginSuccess }) {

    const { login } = useAuth();

    const { formData, handleChange, handleSubmit } = useForm(
        {
            email: "",
            password: ""
        },
        submitForm
    );

    const loginInputs = [
    {name: "email", type: "email", value: formData.email, placeholder: "correo electrónico", autoComplete:"username", onChange: e => handleChange(e)},
    {name: "password", type: "password", value: formData.password, placeholder: "contraseña", autoComplete:"current-password", onChange: e => handleChange(e)}
    ];

    async function submitForm(formData) {
        try {
            const response = await authFetch('login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json();

            if (response.status === 200) {
                login(data);
        
                onLoginSuccess();
            }
            
        } catch(error) {
            console.log("Error");
        }
    }

    return (
        <form className='flex flex-col flex-1 justify-center items-center space-y-6' onSubmit={ handleSubmit }>
            <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
            {
            loginInputs.map((elem, index) => <TextInput { ...elem } className="w-full" key={ index } />)
            }
            <button type="submit" className='w-full text-white bg-red-400 p-3 rounded-md cursor-pointer'>Iniciar Sesión</button>
            <a href="" className='text-stone-400 underline'>Olvidaste la contraseña?</a>
        </form>
    );
}