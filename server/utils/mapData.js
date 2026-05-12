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

    return mappedAddress;
}

export function mapCompanyToBD(name, description) {
    const mappedCompany = {
        nombre: name,
        descripcion: description
    };

    for (let [key, value] of Object.entries(mappedCompany)) {
        if (!value) {
            delete mappedCompany[key];
        }
    }

    return mappedCompany;
}

export function mapProductToBD({
    name, price, discount, shippingCost,
    stock, brand, description, catId
}) {
    const mappedProduct = {
        nombre: name,
        precio: price,
        descuento: discount,
        costo_envio: shippingCost,
        stock,
        marca: brand,
        descripcion: description,
        id_categoria: catId
    };

    for (let [key, value] of Object.entries(mappedProduct)) {
        if (!value && value !== 0) {
            delete mappedProduct[key];
        }
    }

    return mappedProduct;
}