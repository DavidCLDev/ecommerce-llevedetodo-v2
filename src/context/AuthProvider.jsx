import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setAuthLoading(false);
            return;
        }

        fetch('/api/auth/login', {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        .then (res => {
            if (!res.ok) throw Error("Token inválido");
            return res.json();
        })
        .then (data => setUser(data.user))
        .catch(() => {logout();})
        .finally(() => setAuthLoading(false));
    }, []);

    function login(data) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
    }

    function logout() {
        console.log("logout se está ejecutando");
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, setUser, authLoading, login, logout }}>
            {children}
        </UserContext.Provider>
    );

}

