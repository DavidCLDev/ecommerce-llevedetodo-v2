import { apiFetch } from "./apiFetch";

export async function fetchDepartments() {
    const response = await apiFetch(`departments`,{
        method: 'GET'
    });

    return response;
}

export async function fetchMunicipalities(id) {
    const response = await apiFetch(`departments/${id}/municipalities`,{
        method: 'GET'
    });

    return response;
}