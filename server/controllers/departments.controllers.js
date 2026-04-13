import { fetchDepartments } from "../models/departamento.model.js";
import { fetchMunicipalitiesByDep } from "../models/municipio.model.js";

export async function getDepartments(_, res) {
    try {
        const departments = await fetchDepartments();

        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export async function getMunicipalities(req, res) {
    try {
        const { id } = req.params;

        const mun = await fetchMunicipalitiesByDep(id);

        if (!mun.length) {
            return res.status(404).json({
                message: "No existe ningún departamento con el código suministrado"
            });
        }

        res.status(200).json(mun);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}