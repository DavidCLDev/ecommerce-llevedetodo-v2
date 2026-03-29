import { Link } from 'react-router-dom';
import Logo from '../assets/images/lleveDTodo.png';

export default function SimpleHeader() {
    return(
        <header>
            <nav className="flex items-center w-full h-18 bg-zinc-50 px-25 py-15">
                <div className="w-55">
                    <Link to="/"><img src={ Logo } alt="Lleve de todo"/></Link>
                </div>
            </nav>
        </header>
    );
}