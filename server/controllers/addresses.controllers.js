import {
    insertAddress, fetchAddresses, fetchAddress, updateAddress,
    deleteUserAddressById, existsAddress
} from "../models/direccion.model.js";
import { isPhoneValid } from '../utils/verifyData.js';
import { mapAddressToBD } from "../utils/mapData.js";

export async function createAddress(req, res) {
    try {

        const {
            neighborhood, exactAddress, zipCode, owner, phone, isMain,
            municipalityId, userId
        } = req.body.address;


        const { exactAddressIsDuplicated } = await existsAddress(
            exactAddress, zipCode, neighborhood, municipalityId
        );

        if (exactAddressIsDuplicated) {
            return res.status(409).json({ message: "La dirección ya existe" });
        }

        if (!isPhoneValid(phone)) {
            return res.status(400).json({
                message: 'El formato del número no concuerda con un número del país'
            });
        }

        await insertAddress(
            neighborhood, exactAddress, zipCode, owner, phone, isMain,
            municipalityId, req.user.id
        );

        return res.status(204).send();

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message:"La dirección ya está registrada"
            });
        }
        res.status(500).json({ message: "Error del Servidor" });
    }
}

export async function getBasicAddresses(req, res) {
    try {
        const userId = req.user.id;

        const addresses = await fetchAddresses(userId);

        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export async function getSpecificAddress(req, res) {
    try {
        const { addressId } = req.params;
        const userId = req.user.id;

        const address = await fetchAddress(userId, addressId);

        if (!address) {
            return res.status(404).json({
                message: "No existe una dirección con el código proporcionado"
            });
        }

        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export async function deleteUserAddress(req, res) {
    try {
        const { addressId } = req.params;

        const userId = req.user.id;

        const deleteConfirmed = await deleteUserAddressById(userId, addressId);

        if (!deleteConfirmed) {
            return res.status(404).json({
                message: "No existe una dirección con el código proporcionado"
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export async function updateAddressData(req, res) {
    try {
        const addressId = Number(req.params.addressId);
        const userId = req.user.id;
        const data = mapAddressToBD(req.body.address);

        const updateConfirmed = await updateAddress(userId, addressId, data);

        if (!updateConfirmed) {
            return res.status(404).json({
                message: "No existe una dirección con el código proporcionado"
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}