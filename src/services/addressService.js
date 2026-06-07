import { apiFetch } from './apiFetch';

export async function addAddress(body) {

    const address= {address: body}

    const response = await apiFetch(`users/me/addresses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(address)
    });

    return response;
}