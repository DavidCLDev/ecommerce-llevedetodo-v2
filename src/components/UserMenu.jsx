export default function UserMenu() {

    const menus = [
        ['Mis Ordenes', 'Centro de Mensajes', 'Pagos', 'Cupones', 'Favoritos'],
        ['Configuración', 'Centro de Ayuda', 'Reportes', 'Negocios']
    ]

    return (
        <div className="absolute top-full pt-5 right-1/2 translate-x-1/2 drop-shadow-xl z-50">
            <div
            className="
                    w-60 p-5
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
                    menus.map((menu, index) => {
                        return (
                        <ul key={index}>
                            {
                                menu.map((option, index) => <li className="hover:bg-orange-300/70 rounded-sm" key={option}><a href="" className="block my-2 p-2 w-full h-full text-md">{ option }</a></li>)
                            }
                        </ul>);
                    })
                }
            </div>

        </div>
    );
}