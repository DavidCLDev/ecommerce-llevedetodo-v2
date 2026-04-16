export function checkCard(req, res, next) {
    try {
        const { holder, cardNumber, expiry } = req.body;

        if (!holder || !cardNumber || !expiry) {
            return res.status(400).json({
                message: "Datos incompletos"
            });
        }

        if (!/^\d{13,19}$/.test(cardNumber)) {
            return res.status(400).json({
                message: "Número de tarjeta inválido"
            });
        }

        if (holder.length < 3) {
            return res.status(400).json({
                message: "Titular inválido"
            });
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
            return res.status(400).json({
                message: "Formato de fecha inválido"
            });
        }

        next();

    } catch (error) {
        res.status(500).json({ message: "Error del servidor" })
    }
}