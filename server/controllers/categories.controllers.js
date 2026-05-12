
import { selectAllCategories } from "../models/categoria.model.js";

export async function getAllCategories(_, res) {
    try {
        const categories = await selectAllCategories();

        const categoriesMap = Object.fromEntries(
            categories.map((category) => [category.nombre, category.id])
        );

        res.status(200).json(categoriesMap);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
}