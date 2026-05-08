import pool from "../config/db.js";
import { insertAddress, existsExactAddress } from "../models/direccion.model.js";
import { addressExists, deleteCompanyByUser, getCompanyById, insertCompany, nameCompanyExists, sellerExists, updateCompany } from "../models/empresa.model.js";
import { mapCompanyToBD } from "../utils/mapData.js";
import { isNeighborhoodValid } from "../utils/verifyData.js";

export async function createCompany(req, res) {
    const conn = await pool.getConnection();

    try {
        const {
            name, description
        } = req.body;

        if (!name || !description) {
            return res.status(400).json({ message:"Datos incompletos" });
        }

        const {
            neighborhood, exactAddress, zipCode,
            isMain, municipalityId
        } = req.body.address;

        if (name && isNeighborhoodValid(name)) {
            return res.status(400).json({ message:"Nombre de empresa inválido" });
        }

        const { exactAddressIsDuplicated } = await existsExactAddress(exactAddress);

        if (exactAddressIsDuplicated) {
            return res.status(409).json({ message: "La dirección ya existe" });
        }

        const { nameCompanyIsDuplicated } = await nameCompanyExists(name);

        if (nameCompanyIsDuplicated) {
            return res.status(409).json({ message: "El nombre ya está registrado" });
        }

        const { userHasCompany } = await sellerExists(req.user.id);

        if (userHasCompany) {
            return res.status(409).json({ message: "el vendedor ya está asignado a otra empresa" });
        }
        
        await conn.beginTransaction();
        
        
        const addressId = await insertAddress(
            neighborhood, exactAddress, zipCode,
            isMain, municipalityId, req.user.id
        );
        
        const { addressIsDuplicated } = await addressExists(addressId);

        if (addressIsDuplicated) {
            return res.status(409).json({ message: "la dirección ya está asignada a otra empresa" });
        }
        
        await insertCompany(name.trim().replace(/\s+/g, ' '), description, addressId, req.user.id);

        await conn.commit();

        return res.status(204).send();

    } catch (error) {
        await conn.rollback();
        res.status(500).json({ message: "Error del Servidor" });
    }
}

export async function getCompany(req, res) {
    try {

        const { userHasCompany } = await sellerExists(req.user.id);

        if (!userHasCompany) {
            return res.status(404).json({ message: "el usuario no tiene asignada a ninguna empresa" });
        }

        const { name, description, logo, ...address } = await getCompanyById(req.user.id);

        res.status(200).json({ name, description, logo, address });
    } catch (error) {
        res.status(500).json({ message: "Error del Servidor" });
    }
}

export async function modifyCompanyData(req, res) {
    try {
        const {
            name, description
        } = req.body;

        if (!name && !description) {
            return res.status(400).json({ message:"Datos incompletos" });
        }

        if (name && isNeighborhoodValid(name)) {
            return res.status(400).json({ message:"Nombre de empresa inválido" });
        }

        const { nameCompanyIsDuplicated } = await nameCompanyExists(name);

        if (nameCompanyIsDuplicated) {
            return res.status(409).json({ message: "El nombre ya está registrado" });
        }

        const data = mapCompanyToBD(name, description);

        const success = await updateCompany(req.user.id, data);

        if (!success) {
            return res.status(404).json({
                message: "el usuario no tiene asignada a ninguna empresa"
            });
        }

        res.status(204).send();

    } catch (error) {
        res.status(500).json({ message: "Error del Servidor" });
    }
}

export async function deleteCompany(req, res) {
    try {

        const { userHasCompany } = await sellerExists(req.user.id);

        if (!userHasCompany) {
            return res.status(404).json({ message: "el usuario no tiene asignada a ninguna empresa" });
        }

        await deleteCompanyByUser(req.user.id);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error del Servidor" });
    }
}