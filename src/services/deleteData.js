export async function deleteItem(endpoint, options) {
    const response = await fetch(`/api/${endpoint}`, options);

    return response;
}