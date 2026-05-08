import { getCompanyIdByUser } from "../models/empresa.model.js";

export async function checkForCompany(req, res, next) {
    try {
        if (!req.user.company) {
            const companyId = await getCompanyIdByUser(req.user.id);

            if (companyId) {
                req.company = companyId;
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" })
    }
}