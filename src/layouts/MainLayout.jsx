import { Outlet } from 'react-router-dom';

import MainHeader from '../components/MainHeader';
import Footer from '../components/Footer';
import Modal from "../components/Modal";
import LoginForm from '../components/LoginForm';

import { useState } from 'react';

export default function Layout() {

    // Variable y función que maneja el estado del modal (Abierto o cerrado).
    const [isOpen, setOpen] = useState(false);

    function closeModal() {setOpen(false);}

    return(
        <div className="min-h-screen bg-zinc-50 overflow-hidden">
            <MainHeader onOpen={() => setOpen(true)} onUserMenu={() => setUserMenu(true)} /> 
            <Outlet />
            <Footer />

            {isOpen && (
                <Modal onClose={closeModal}>
                    <LoginForm onLoginSuccess={ closeModal } />
                </Modal>
            )}
        </div>
    );
}