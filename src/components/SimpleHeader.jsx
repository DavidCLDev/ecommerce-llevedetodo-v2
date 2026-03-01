import Logo from '../assets/images/lleveDTodo.png';

export default function SimpleHeader() {
    return(
        <header className="z-50">
        <nav className="w-full bg-zinc-50 px-25 pt-6 pb-4 space-y-2">
            <div className="w-55">
                <a href="/"><img src={ Logo } alt="Lleve de todo"/></a>
            </div>
        </nav>
    </header>
    );
}