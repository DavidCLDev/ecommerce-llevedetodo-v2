import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserPanelCard({ atributes }) {

    const {header, description, icon, ruta} = atributes;

    return (
        <Link to={ ruta }>
            <section className="flex flex-col gap-5 h-40 bg-amber-50 p-4 rounded-sm">
                <div>
                    <FontAwesomeIcon icon={ icon } size="lg" />
                </div>
                <header>
                    <h2>{ header }</h2>
                    <p className="text-sm text-zinc-600">{ description }</p>
                </header>
            </section>
        </Link>
    );
}