import { apiFetch } from './apiFetch';

export async function fetchAdditionalData() {
    const response = await apiFetch(`users/me`,{
        method: 'GET'
    });

    return response;
}

export async function updateUserData(body) {

    const response = await apiFetch(`users/me`, {
        method: "PATCH",
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar");
    }

    const updatedUser = await response.json()

    return updatedUser;
}

export async function deleteUser(body) {
    const response = await apiFetch(`users/me`,{
        method: 'DELETE',
        body: JSON.stringify(body)
    });

    return response;
}