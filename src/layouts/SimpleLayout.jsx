import { Outlet } from 'react-router-dom';

import Header from '../components/SimpleHeader'
import Footer from '../components/Footer';

export default function BaseLayout() {

    return(
        <div className="min-h-screen bg-zinc-50 overflow-hidden">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}