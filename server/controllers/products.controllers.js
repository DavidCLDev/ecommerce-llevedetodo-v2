import fs from 'fs';
import path from 'path';
import { deleteProductById, getProductById, insertProduct, updateProduct } from '../models/producto.model.js';
import { isCategoryInModel } from '../models/categoria.model.js';
import { mapProductToBD } from '../utils/mapData.js';

// Creacioń de la ruta al archivo productos.json
const filePath = path.join(process.cwd(), 'server/data/productos.json');

// Función para obtener las recomendaciones de productos
export async function getRecommendedProducts(req, res) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    res.json(data);
}

// Función para obtener un producto en específico
export async function getSingleProduct(req, res) {
    const { productId } = req.params;

    const product = await getProductById(productId);

    if (!product) {
        return res.status(404).json({
            message: "No existe ningún producto con el id proporcionado"
        });
    }
    
    product.company = { id: product.companyId, name: product.company };
    product.category = { id: product.categoryId, name: product.category };

    delete product.companyId;
    delete product.categoryId;

    res.status(200).json(product);
}

// Función para crear un producto
export async function createProduct(req, res) {
    try {

        // Verificar que el usuario tenga asignada una empresa
        if (!req.user.company) {
            return res.status(401).json({
                message: "el usuario no tiene asignada a ninguna empresa"
            });
        }

        const {
            name, price, discount=0, shippingCost=0, stock,
            brand, descr, catId
        } = req.body;

        // Verificar que se obtengan todos los datos necesarios
        if (
            !name || !price || !stock ||
            !brand || !descr || !catId
        ) {
            return res.status(400).json({ message: "Datos incompletos" });
        }

        // Verificar que el precio sea mayor a 50
        if (price <= 50) {
            return res.status(409).json({
                message: "el precio debe ser mayor a 50"
            });
        }
        
        // Verificar que el descuento sea un número entre 0 y 1
        if (discount && (discount < 0 || discount >= 1)) {
            return res.status(409).json({
                message: "el descuento debe estar entre 0 y 1"
            });
        }
        
        // Verificar que el stock no sea negativo
        if (stock < 0) {
            return res.status(409).json({
                message: "el stock debe ser mayor o igual a 0"
            });
        }

        // Verificar que el costo de envío no sea negativo
        if (shippingCost < 0) {
            return res.status(409).json({
                message: "el costo de envío debe ser mayor o igual a 0"
            });
        }
        
        /* Ejecutar consulta en la base de datos que confirma que el id de la
        categoría existe */
        const { categoryExistence } = await isCategoryInModel(catId);

        // Verificar que la categoría existe en la base de datos
        if (!categoryExistence) {
            return res.status(404).json({ message: "No existe la categoría" });
        }

        /* Ejecutar comando para insertar el registro del producto en la base
        de datos */
        await insertProduct(
            name, price, discount, shippingCost, stock, brand,
            descr, catId, req.user.company
        );

        // Enviar respuesta de confirmación de la acción sin contenido
        res.status(204).send();

    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
}

// Función para modificar los datos de un producto en específico
export async function modifyProductData(req, res) {
    try {
        const {
            name, price, discount, shippingCost,
            stock, brand, description, catId
        } = req.body;

        const { company } = req.user;
        const { productId } = req.params;

        if (!company) {
            return res.status(401).json({
                message: "el usuario no tiene asignada a ninguna empresa"
            });
        }

        if (!name && !price && !discount && !shippingCost
            && !stock && !brand && !description && catId) {
            return res.status(400).json({ message:"Datos incompletos" });
        }

         // Verificar que el precio sea mayor a 50
        if (price <= 50) {
            return res.status(409).json({
                message: "el precio debe ser mayor a 50"
            });
        }
        
        // Verificar que el descuento sea un número entre 0 y 1
        if (discount && (discount < 0 || discount >= 1)) {
            return res.status(409).json({
                message: "el descuento debe estar entre 0 y 1"
            });
        }
        
        // Verificar que el stock no sea negativo
        if (stock < 0) {
            return res.status(409).json({
                message: "el stock debe ser mayor o igual a 0"
            });
        }

        // Verificar que el costo de envío no sea negativo
        if (shippingCost < 0) {
            return res.status(409).json({
                message: "el costo de envío debe ser mayor o igual a 0"
            });
        }

        if (catId) {
            /* Ejecutar consulta en la base de datos que confirma que el id de la
            categoría existe */
            const { categoryExistence } = await isCategoryInModel(catId);
    
            // Verificar que la categoría existe en la base de datos
            if (!categoryExistence) {
                return res.status(404).json({ message: "No existe la categoría" });
            }
        }

        const data = mapProductToBD(req.body);

        const success = await updateProduct( 
            company,
            productId,
            data
        );

        if (!success) {
            return res.status(404).json({
                message: "No se pudo actualizar el producto."
            });
        }

        res.status(204).send();

    } catch (error) {
        res.status(500).json({ message: "Error del Servidor" });
    }
}

// Función para eliminar un producto
export async function deleteProduct(req, res) {
    try {
        const { company } = req.user;
        const { productId } = req.params;

        // Verificar que el usuario tenga asignada una empresa
        if (!req.user.company) {
            return res.status(401).json({
                message: "el usuario no tiene asignada a ninguna empresa"
            });
        }

        // Ejecutar comando para eliminar registro de producto
        const success = await deleteProductById(company, productId);

        // Verificar que la eliminación haya sido exitosa
        if (!success) {
            return res.status(404).json({
                message: 
                "El producto con el identificador proporcionado, no existe"
            });
        }

        // Enviar respuesta de confirmación de la acción sin contenido
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
}