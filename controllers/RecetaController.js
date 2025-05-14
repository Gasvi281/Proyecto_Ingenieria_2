const { Receta, IngredientesReceta, Producto, Cuenta } = require("../models");

const getRecetaById = async (req, res) => {
    try {
        const { id } = req.params;

        const receta = await Receta.findByPk(id, {
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

const addReceta = async (req,res) =>{
    try {
        const { nombre,
            dificultad,
            Categoria,
            ingredientes
        } = req.body;

        if(!ingredientes || ingredientes.length === 0){
            return res.status(400).json({message: "La receta debe tener al menos un ingrediente"});
        }

        const receta = await Receta.create({
            nombre,
            dificultad,
            Categoria
        });

        const ings = [];

        for(const i of ingredientes){
            const ingrediente = await IngredientesReceta.findByPk(i.id);
            if(!ingrediente){
                await receta.destroy();
                return res.status(404).json({error: "Ingrediente no encontrado"});
            }

            const ing = await IngredientesReceta.create({
                recetaId: receta.id,
                productoId: i.id,
                cantidad: i.cantidad
            })

            ings.push(ing);
        }

        return res.status(201).json(receta, ings);
    } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
    }
}

const editarReceta = async (req, res) =>{
    try {
        const { id } = req.params;
        const { nombre,
            dificultad,
            Categoria
        } = req.body;

        const receta = await Receta.getRecetaById(id);

        if(!receta){
            return res.status(404).json({ message: "Receta no encontrada"});
        }

        if(nombre) receta.nombre = nombre;
        if(dificultad) receta.dificultad = dificultad;
        if(Categoria) receta.Categoria = Categoria;

        await receta.save();
        return res.status(200).json({message: "Receta actualizada"});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const eliminarReceta = async (req, res) =>{

}

const agregarIngrediente = async (req, res) =>{
    try {
        const { id } = req.params;
        const { productoId } = req.body;

        const receta = await Receta.findByPk(id);

        if(!receta){
            return res.status(404).json({message: "Receta no encontrada"});
        }

        const ingrediente = await IngredientesReceta.findOne({where: {recetaId: id, productoId: productoId}});

        if(ingrediente){
            return res.status(400).json({message: "este ingrediente ya hace parte de la receta"});
        }

        const nuevoIngrediente = await IngredientesReceta.create({
            recetaId: id,
            productoId: productoId,
        })

        return res.status(201).json(nuevoIngrediente);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const eliminarIngrediente = async (req, res) =>{
    try {
        const { id } = req.params;
        const { productoId } = req.body;

        const receta = await Receta.findByPk(id);

        if(!receta){
            return res.status(404).json({message: "Receta no encontrada"});
        }

        const ingrediente = await IngredientesReceta.findOne({ where: {recetaId: id, productoId: productoId}});

        if(!ingrediente){
            return res.status(400).json({message: "este ingrediente no se encuentra en la receta seleccionada"});
        }

        await ingrediente.destroy();

        return res.status(200).json({message: "ingrediente eliminado"});
    } catch (error) {
        return res.satus(500).json({error: error.message});
    }
}

module.exports = { getRecetaByNombre, 
    getRecetaById, 
    getRecetas, 
    addReceta, 
    editarReceta, 
    agregarIngrediente, 
    eliminarIngrediente};