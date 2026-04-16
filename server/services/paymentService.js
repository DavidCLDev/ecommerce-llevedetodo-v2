import { insertCard } from "../models/tarjeta.model.js";

export async function paymentService(data, userId) {
    const { holder, cardNumber, expiry } = data;

    const [month, year] = expiry.split('/');

    const currentDate = new Date();
    const expiryDate = new Date(`20${year}`, month);

    if (expiryDate < currentDate) {
        throw new Error("Tarjeta expirada");
    }

    const token = crypto.randomUUID();
    const last4 = cardNumber.slice(-4);

    await insertCard ({
        holder,
        last4,
        expiry,
        token,
        userId
    })
}