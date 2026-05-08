export function checkRequestBody(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "La petición no contiene ningún dato"
        });
    }

    next();
}