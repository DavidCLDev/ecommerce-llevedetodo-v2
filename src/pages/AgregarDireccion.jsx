import TextInput from "../components/TextInput";

export default function AgregarDireccion() {
    return (
        <div className="flex justify-center py-15 w-full h-200">
            <div className="w-1/2 p-15 bg-amber-50">
                <form className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-1 col-span-full">
                        <label htmlFor="">Dirección</label>
                        <TextInput className="p-2 bg-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="departamento">Departamento</label>
                        <select name="departamento" className="bg-white border-1 border-zinc-500 p-2  rounded-md">
                            <option value="">Atlántico</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="municipio">Municipio</label>
                        <select name="municipio" className="bg-white border-1 border-zinc-500 p-2 rounded-md">
                            <option value="">Barranquilla</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="barrio">Barrio</label>
                        <TextInput className="bg-white p-2" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="residencia">Apartamento / Casa (opcional)</label>
                        <TextInput className="bg-white p-2" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-full">
                        <label htmlFor="nombre">Nombre y Apellido</label>
                        <TextInput className="bg-white p-2" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-full">
                        <label htmlFor="celular">Celular</label>
                        <TextInput className="bg-white p-2" />
                    </div>
                    <button className="bg-green-400 text-white p-3 col-span-full cursor-pointer rounded-sm">Agregar</button>
                </form>
            </div>
        </div>
    );
}