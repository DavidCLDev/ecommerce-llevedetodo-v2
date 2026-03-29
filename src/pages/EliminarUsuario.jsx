import DeleteUserForm from "../components/DeleteUserForm";

export default function EliminarUsuario() {

    return (
        <main className="flex items-center py-20 bg-amber-500">
            <div className="w-1/3 p-8 m-auto bg-zinc-50 rounded-sm">
                <header className="mb-4 text-center">
                    <h1 className="text-2xl font-bond">Eliminar Cuenta</h1>
                </header>
                <DeleteUserForm />
            </div>
        </main>
    );
}