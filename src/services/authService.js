import { apiFetch } from './apiFetch';

export async function authFetch(endpoint, body) {
    const response = await apiFetch(`auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    return response;
}