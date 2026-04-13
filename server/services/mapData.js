export function mapUser({ id, nombre, nombre_de_usuario, correo }) {
    return {id: id, name: nombre, username: nombre_de_usuario, email: correo};
}

export function mapAdditionalData({ apellido, celular  }) {
    return {lastname: apellido, phone: celular};
}

export function mapAddressToBD({ neighborhood, exactAddress, zipCode, isMain, municipalityId }) {
    const mappedAddress = {
        barrio: neighborhood,
        direccion_exacta: exactAddress,
        codigo_postal: zipCode,
        es_principal: isMain,
        id_municipio: municipalityId
    };

    for (let [key, value] of Object.entries(mappedAddress)) {
        if (!value) {
            delete mappedAddress[key];
        }
    }

    return mappedAddress
}