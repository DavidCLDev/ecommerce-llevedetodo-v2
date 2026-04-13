export function isPhoneValid(phoneNumber) {
    let isValid = false;

    const phoneRegex = /^3\d{9}$/;

    if (phoneRegex.test(phoneNumber)) {
        isValid = true;
    }

    return isValid;
}

export function isNameValid(name) {
    let isValid = false;
    
    if (!(name.length < 3 || name.includes(" "))) {
        isValid = true;
    }

    return isValid;
}

export function isNeighborhoodValid(neighborhood) {
    return typeof neighborhood === "string" && neighborhood &&neighborhood.trim().length < 5;
}

export function isExactAddressValid(exactAddress) {
    return typeof exactAddress === "string" && exactAddress.trim().length < 10;
}

export function isZipCodeValid(zipCode) {
    return typeof zipCode === "string" && !/^\d{6}$/.test(zipCode);
}