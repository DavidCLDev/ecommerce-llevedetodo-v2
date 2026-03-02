import { useState } from "react";

import TextInput from './TextInput';

import { useAuth } from '../hooks/useAuth'

export default function LoginForm({ onLoginSuccess }) {

    const { login } = useAuth();

    // Variable y función que maneja el estado del input del correo
    const [email, setEmail] = useState('');

    // Variable y función que maneja el estado del input de la contraseña
    const [password, setPassword] = useState('');

    const loginInputs = [
    {name: "email", type: "email", placeholder: "correo electrónico", autoComplete:"username", onChange: e => setEmail(e.target.value)},
    {name: "password", type: "password", placeholder: "contraseña", autoComplete:"current-password", onChange: e => setPassword(e.target.value)}
    ];

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json();
        
        login(data);

        onLoginSuccess();
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