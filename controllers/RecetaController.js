const { Receta, IngredientesReceta, Producto } = require("../models");


const getRecetaByNombre = async (req, res) => {
    try {
        const { nombre } = req.params;

        const receta = await Receta.findOne({
            where: { nombre },
            include: [{
                model: IngredientesReceta, as: "ingredientes",
                include: [{ model: Producto, as: "producto" }]
            }],
        });

        if (!receta) {
            return res.status(404).json({ error: "Receta no encontrada" });
        }

        return res.status(200).json(receta);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const getRecetas = async (req, res) => {
    try {
        const recetas = await Receta.findAll({
            include: [{
                model: IngredientesReceta, as: "ingredientes",
                include: [{ model: Producto, as: "producto" }]
            }]
        })

        return res.status(200).json(recetas);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = { getRecetaByNombre, getRecetas };