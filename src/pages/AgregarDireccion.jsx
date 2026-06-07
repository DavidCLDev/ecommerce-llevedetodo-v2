import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { fetchDepartments, fetchMunicipalities } from '../services/departmentService';
import TextInput from "../components/TextInput";
import { addAddress } from '../services/addressService';

export default function AgregarDireccion() {

    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);

    const {formData, handleChange, handleSubmit} = useForm({
        exactAddress: "",
        department: 99,
        municipalityId: 0,
        neighborhood: "",
        zipCode: ""
    }, submitForm);

    useEffect(() => {
         const cargarDepartamentos = async () => {
            const response = await fetchDepartments();

            const data = await response.json();

            if (data) {
                setDepartamentos(data);
            }
            
        };

        cargarDepartamentos();
    }, []);

    useEffect(() => {
         const cargarMunicipios = async () => {
            const response = await fetchMunicipalities(formData.department);

            const data = await response.json();

            console.log(data);

            if (data) {
                setMunicipios(data);
            }
            
        };

        cargarMunicipios();
    }, [formData.department]);

    async function submitForm(formData) {
        try {
            console.log("subiendo el formulario");
            const response = await addAddress(formData);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center py-15 w-full">
            <div className="w-1/2 p-15 bg-amber-50">
                <form
                className="grid grid-cols-2 gap-12"
                method="POST"
                onSubmit={ handleSubmit }>
                    <div className="flex flex-col gap-1 col-span-full">
                        <label htmlFor="exactAddress">Dirección</label>
                        <TextInput
                        className="p-2 bg-white"
                        name="exactAddress"
                        value={ formData.exactAddress }
                        onChange={ handleChange }
                        required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="departament">Departamento</label>
                        <select
                        type="number"
                        name="department"
                        className="bg-white border-1 border-zinc-500
                        p-2  rounded-md"
                        value={ formData.department }
                        onChange={ handleChange }>
                            {
                                departamentos.map((departmento) => {
                                    return (
                                        <option
                                        key={ departmento.id }
                                        value={ departmento.id }
                                        onChange={ handleChange }>
                                            { departmento.name }
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="municipalityId">Municipio</label>
                        <select
                        name="municipalityId"
                        className="bg-white border-1 border-zinc-500
                        p-2 rounded-md"
                        value={ formData.municipalityId }
                        onChange={ handleChange }>
                            {
                                municipios.map((municipio) => {
                                    return (
                                        <option
                                        key={ municipio.id }
                                        value={ municipio.id }
                                        onChange={ handleChange }>
                                            { municipio.name }
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="neighborhood">Barrio</label>
                        <TextInput
                        className="bg-white p-2"
                        name="neighborhood"
                        value= { formData.neighborhood }
                        onChange= { handleChange }
                        required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="zipCode">código postal</label>
                        <TextInput
                        className="bg-white p-2"
                        name="zipCode"
                        value= { formData.zipCode }
                        onChange= { handleChange }
                        maxLength="6"
                        required />
                    </div>
                    <button
                    className="bg-green-400 text-white p-3 col-span-full
                    cursor-pointer rounded-sm">
                        Agregar
                    </button>
                </form>
            </div>
        </div>
    );
}