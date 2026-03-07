import ordenes from '../assets/icons/order.svg';
import mensajes from '../assets/icons/messages.svg';
import pagos from '../assets/icons/pagos.svg';
import cupones from '../assets/icons/cupon.svg';
import favoritos from '../assets/icons/favoritos.svg';
import logoutIcon from '../assets/icons/logout.svg';

import { useAuth } from '../hooks/useAuth';

export default function UserMenu() {

    const { logout } = useAuth();

    const submenu1 = [
        {
            name: 'Mis Órdenes',
            icon: ordenes
        },
        {
            name: 'Centro de Mensajes',
            icon: mensajes
        },
        {
            name: 'Pagos',
            icon: pagos
        },
        {
            name: 'Cupones',
            icon: cupones
        },
        {
            name: 'Favoritos',
            icon: favoritos
        },
    ]

    const submenu2 = ['Configuración', 'Centro de Ayuda', 'Reportes', 'Negocios'];

    return (
        <div className="absolute top-full pt-5 right-1/2 translate-x-1/2 drop-shadow-xl z-50">
            <div
            className="
                    w-70 px-5
                    bg-white
                    rounded-md z-100
                    before:block before:bg-white
                    before:z-0 before:absolute
                    before:w-5 before:h-5
                    before:transform before:rotate-45
                    before:top-0 before:right-1/2
                    before:translate-1/2
                    "
            >
                {
                    <>
                        <ul className='flex flex-col py-6 gap-3 border-b-1'>
                            {
                                submenu1.map((option) => {
                                    return (
                                    <li className="pl-2 hover:bg-orange-300/70 rounded-sm" key={option.name}>
                                        <a href="" className="flex items-center gap-3 block p-2 w-full h-full text-md">
                                            <img src={ option.icon } alt={ option.name } className='size-6' />
                                            <p>{ option.name }</p>
                                        </a>
                                    </li>);
                                })
                            }
                        </ul>
                        <ul className='flex flex-col py-6 gap-3 border-b-1'>
                            {
                                submenu2.map((option) => {
                                    return (
                                    <li className="pl-3 hover:bg-orange-300/70 rounded-sm" key={option}>
                                        <a href="" className="block p-2 w-full h-full text-sm">{ option }</a>
                                    </li>
                                    );
                                })
                            }
                            <li className="pl-3 hover:bg-orange-300/70 rounded-sm">
                                <button onClick={ logout } className="flex items-center block p-2 w-full h-full text-sm text-red-500 cursor-pointer">
                                    <img src={ logoutIcon } alt="Cerrar sesión" className='size-6 ' />
                                    <p>Cerrar sesión</p>
                                </button>
                            </li>
                        </ul>
                    </>
                }
            </div>

        </div>
    );
}