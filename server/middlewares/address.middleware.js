import { existsMunicipality } from "../models/municipio.model.js";
import { isExactAddressValid, isNeighborhoodValid, isZipCodeValid } from "../utils/verifyData.js";

export async function validateAddress(req, res, next) {
    const {
        neighborhood, exactAddress, zipCode,
        municipalityId
    } = req.body.address;

    if (neighborhood && isNeighborhoodValid(neighborhood)) {
        return res.status(400).json({ message:"Nombre de barrio inválido" });
    }

    if (exactAddress && isExactAddressValid(exactAddress)) {
        return res.status(400).json({ message:"La dirección proporcionada es inválida" });
    }

    if (zipCode && isZipCodeValid(zipCode)) {
        return res.status(400).json({ message:"código de postal inválido" });
    }

    if (municipalityId) {
        const municipalityExists = await existsMunicipality(municipalityId);
    
        if (!municipalityExists) {
            return res.status(404).json({ message:"El código del municipio no existe" });
        }
    }

    next();
    
}

export function isAddressEmpty(req, res, next) {
    if (!req.body.address || !Object.keys(req.body.address).length) {
        return res.status(400).json({ message:"Datos incompletos" });
    }
    next();
}

export function checkForAllAddressFields(req, res, next) {

    const {
        neighborhood, exactAddress, zipCode,
        municipalityId
    } = req.body.address;

    if (!neighborhood || !exactAddress ||
        !zipCode || !municipalityId) {
        return res.status(400).json({ message:"Datos incompletos" });
    }
    next();
}

export function checkAddressObject(req, res, next) {
    if (!req.body.address) {
        return res.status(400).json({ message:"No se especifica ninguna dirección en la petición" });
    }

    next();
}