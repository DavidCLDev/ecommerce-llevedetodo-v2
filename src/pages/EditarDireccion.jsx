import { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { fetchDepartments, fetchMunicipalities } from '../services/departmentService';
import TextInput from "../components/TextInput";
import { addAddress, editAddress, fetchSpecificAddress } from '../services/addressService';
import { useNavigate, useParams } from "react-router-dom";

export default function EditarDireccion() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [address, setAddress] = useState({});
    const [departamentos, setDepartamentos] = useState([]);
    const [municipios, setMunicipios] = useState([]);

    const {formData, handleChange, handleSubmit} = useForm({
        exactAddress: "",
        department: 99,
        municipalityId: 0,
        neighborhood: "",
        zipCode: "",
        owner: "",
        phone: ""
    }, submitForm);

    useEffect(() => {
        const cargarDireccion = async () => {
            const response = await fetchSpecificAddress(id);

            if (response.ok) {
                const address = await response.json();

                for (let prop of Object.keys(address)) {
                    formData[prop] = address[prop];
                }
    
            }
        };

        cargarDireccion();
    }, []);

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

            if (data) {
                setMunicipios(data);
            }
            
        };

        cargarMunicipios();
    }, [formData.department]);

    async function submitForm(formData) {
        try {
            const response = await editAddress(id, formData);

            if (response.ok) {
                navigate("/cuenta/perfil/direcciones");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="flex justify-center py-15 w-full">
            <div className="w-1/2 p-13 bg-amber-50 rounded-md">
                <h1 className='font-bold text-2xl'>Editar Dirección</h1>
                <form
                className="grid grid-cols-2 gap-12 mt-6"
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
                    <div className="flex flex-col gap-1 col-span-full">
                        <label htmlFor="owner">Nombre y apellido</label>
                        <TextInput
                        className="bg-white p-2"
                        name="owner"
                        value= { formData.owner }
                        onChange= { handleChange }
                        required />
                    </div>
                    <div className="flex flex-col gap-1 col-span-full">
                        <label htmlFor="phone">celular</label>
                        <TextInput
                        className="bg-white p-2"
                        name="phone"
                        value= { formData.phone }
                        onChange= { handleChange }
                        maxLength="10"
                        required />
                    </div>
                    <button
                    className="bg-amber-400 text-white p-3 col-span-full
                    cursor-pointer rounded-sm">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </section>
    );
}