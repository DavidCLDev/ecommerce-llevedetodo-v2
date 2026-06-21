import { apiFetch } from './apiFetch';

export async function addAddress(body) {

    const address= {address: body};

    const response = await apiFetch(`users/me/addresses`, {
        method: 'POST',
        body: JSON.stringify(address)
    });

    return response;
}

export async function fetchUserAddresses(userId) {
    const response = await apiFetch(`users/me/addresses`,{
        method: 'GET'
    });

    return response;
}

export async function fetchSpecificAddress(addressId) {
    const response = await apiFetch(`users/me/addresses/${addressId}`, {
        method: 'GET'
    });

    return response;
}

export async function deleteAddress(addressId) {
    const response = await apiFetch(`users/me/addresses/${addressId}`, {
        method: 'DELETE'
    });

    return response;
}

export async function editAddress(addressId, body) {
    const address= {address: body};

    const response = await apiFetch(`users/me/addresses/${addressId}`, {
        method: 'PATCH',
        body: JSON.stringify(address)
    });

    return response;
}