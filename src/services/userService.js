import { apiFetch } from './apiFetch';

export async function fetchAdditionalData(endpoint, options) {
    const response = await apiFetch(`user/${endpoint}`,{
        method: 'GET'
    });

    return response;
}

export async function updateUserData(id, body) {

    const response = await apiFetch(`user/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar");
    }

    const updatedUser = await response.json()

    return updatedUser;
}

export async function deleteUser(endpoint, body) {
    const response = await apiFetch(`user/${endpoint}`,{
        method: 'DELETE',
        body: JSON.stringify(body)
    });

    return response;
}