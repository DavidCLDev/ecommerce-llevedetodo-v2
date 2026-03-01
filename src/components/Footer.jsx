export default function Footer() {

    function Dev(name, email, github) {
        
        this.name = name;
        this.email = email;
        this.github = github;
    }

    const david = new Dev("David Camacho", "davidcamacho6309@gmail.com","DavidCLDev");
    const gustavo = new Dev("Gustavo Grisales", "tavoandres12@gmail.com","andr3s1414");
    const freyler = new Dev("Freyler Romero", "freylerconro@gmail.com","Fyesid");

    const devs = [david, gustavo, freyler];

    return (
        <footer className="bg-zinc-200">
            <section className="flex flex-col px-20 py-10 space-y-6">
                <h2 className="ml-10 text-xl font-bold self-center">Equipo de Desarrollo</h2>
                <div className="flex justify-between">
                    {
                        devs.map((dev, key) => {
                            return (
                                <address className="flex flex-col items-center text-sm space-y-4" key= { key }>
                                    <strong>{ dev.name }</strong>
                                    <a href={`mailto:${ dev.email } }`} className="text-stone-500 hover:text-stone-400">{ dev.email }</a>
                                    <a href={ `https://github.com/${ dev.github }` } target="_blank" className="text-stone-500 hover:text-stone-400">{ dev.github }</a>
                                </address>
                            );
                        })
                    }
                </div>
            </section>
        </footer>
    );
}