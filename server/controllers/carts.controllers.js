import { insertCartItem, getAllItems, deleteCartItem, updateQuantityById } from "../models/carrito.model.js";
import { productExists } from "../models/producto.model.js";

// Función para agregar un producto a un carrito
export async function createCartItem(req, res) {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        // Consulta que confirma si el producto existe en la base de datos
        const { productExistence } = await productExists(productId);

        // Se verifica que realmente existe el producto
        if (!productExistence) {
            return res.status(404).json({
                message:
                "el id proporcionado no está asignado a ningún producto"
            })
        }

        // Inserción del producto en el carrito, asignándolo a un usuario en
        // la base de datos
        const success = await insertCartItem(userId, productId);

        res.status(204).send();
    } catch (error) {
        // Se verifica si el producto ya estaba registrado previamente.
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: "El producto ya está registrado en el carrito"
            })
        }
        res.status(500).json({ message: "Error del servidor"} );
    }
}

// Función para agregar un producto a un carrito
export async function removeCartItem(req, res) {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        // Eliminación del producto en el carrito en la base de datos
        const success = await deleteCartItem(userId, productId);

        // Confirmación de la eliminación del producto 
        if (!success) {
            return res.status(404).json({
                message:
                "El producto no está en el carrito"
            })
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
}

// Función para obtener los productos registrados en el carrito
export async function getCart(req, res) {
    try {
        const userId = req.user.id;

        res.status(200).json(await getAllItems(userId));
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
}

export async function updateQuantity(req, res) {
    try {
        // Se verifica que la petición lleva un cuerpo
        if (!req.body) {
            return res.status(400).json({
                message: "No se incluyó un cuerpo en la petición"
            });
        }

        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity=null } = req.body;

        // Se verifica que el cuerpo de la petición lleva la propiedad
        // "cantidad".
        if (!quantity) {
            return res.status(400).json({
                message: "No se incluyó la cantidad"
            });
        }

        // Verifica que la cantidad sea un número entero
        if (!(Number.isInteger(quantity))) {
            return res.status(409).json({
                message: "La cantidad debe ser un número entero"
            });
        }

        // Se verifica que la cantidad sea mayor a 1
        if (quantity < 1) {
            return res.status(409).json({
                message: "La cantidad no puede ser menor a 1"
            });
        }

        const success = await updateQuantityById(userId, productId, quantity);

        // Se verifica que el proceso de actualización fue exitoso.
        if (!success) {
            return res.status(404).json({
                message: "El producto no se encuentra registrado"
            });
        }
        
        res.status(204).send();

    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
}