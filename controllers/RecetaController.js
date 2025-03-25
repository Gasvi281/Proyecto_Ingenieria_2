const { Receta, IngredientesReceta, Producto } = require("../models");


const getRecetaByNombre = async (req, res) => {
    try {
        const { nombre } = req.params;

        const receta = await Receta.findOne({
            where: { nombre },
            include: [{
                model: IngredientesReceta, as: "IngredientesReceta",
                include: [{ model: Producto, as: "Producto" }]
            }],
        });

        if (!receta) {
            res.status(404).json({ error: "uPS" });
        }

        res.status(200).json(cuenta);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const getRecetas = async (req, res) => {
    try {
        const recetas = await Receta.findAll({
            include: [{
                model: IngredientesReceta, as: "IngredientesReceta",
                include: [{ model: Producto, as: "Producto" }]
            }]
        })
    } catch (error) {

    }
}

module.exports = { getRecetaByNombre, getRecetas };