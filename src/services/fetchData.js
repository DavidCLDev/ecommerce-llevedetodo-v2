export async function authFetch(endpoint, options) {
    const response = await fetch(`/api/auth/${endpoint}`, options);

    return response;
}