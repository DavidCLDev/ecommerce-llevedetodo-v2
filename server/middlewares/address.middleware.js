import { existsMunicipality } from "../models/municipio.model.js";
import { isExactAddressValid, isNeighborhoodValid, isZipCodeValid } from "../utils/verifyData.js";

export function validateAddress({ required = false } = {}) {

    return async (req, res, next) => {
        const {
            neighborhood, exactAddress, zipCode,
            municipalityId
        } = req.body;

        if (!Object.keys(req.body).length) {
            return res.status(400).json({ message:"Datos incompletos" });
        } else if (required) {
            if (!neighborhood || !exactAddress ||
                !zipCode || !municipalityId) {
                return res.status(400).json({ message:"Datos incompletos" });
            }
        }

        if (neighborhood && isNeighborhoodValid(neighborhood)) {
            res.status(400).json({ message:"Nombre de barrio inválido" });
        }
    
        if (exactAddress && isExactAddressValid(exactAddress)) {
            res.status(400).json({ message:"La dirección proporcionada es inválida" });
        }
    
        if (zipCode && isZipCodeValid(zipCode)) {
            res.status(400).json({ message:"código de postal inválido" });
        }
    
        if (municipalityId) {
            const municipalityExists = await existsMunicipality(municipalityId);
        
            if (!municipalityExists) {
                res.status(404).json({ message:"El código del municipio no existe" })
            }
        }
    
        next();

    } 

    
}