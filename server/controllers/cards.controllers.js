import { getCardsById, deleteCardById } from "../models/tarjeta.model.js";
import { paymentService } from "../services/paymentService.js";

export async function processPayment(req, res) {
    try {
        await paymentService(req.body, req.user.id);
        res.status(204).send();
    } catch(error) {
        res.status(500).json({ message: "Error del servidor" });
    }
}

export async function getCards(req, res) {
    try {
        const userId = req.user.id;

        const addresses = await getCardsById(userId);

        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}

export async function deleteCard(req, res) {
    try {
        const { cardId } = req.params;
    
        const isCardDeleted = await deleteCardById(cardId);
    
        if (!isCardDeleted) {
            return res.status(404).json({
                message: "No existe una tarjeta con el código proporcionado"
            });
        }
    
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" })
    }
}