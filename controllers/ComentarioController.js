const { Cuenta, Comentario } = require("../models");

const getComentarioById = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await Comentario.findByPk(id);

        if (!comentario) {
            res.status(404).json({ error: "uPS" });
        }

        return res.status(200).json(comentario);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const addComentario = async (req, res) => {
    try {

        const {id}=req.params

        const {
            comentario
        } = req.body;

        const cuenta= await Cuenta.findByPk(id)

        if(!cuenta){
            return res.status(404).json({error: "Cuenta no encontrada"})
        }

        const comment= await Comentario.create({
            comentario,
            cuentaId: id,
        })

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const desactivarComentario = async (req, res) => {
    try {
        const { id } = req.params;

        // Busca la cuenta por su clave primaria
        const comentario = await Comentario.findByPk(id);

        // Si no existe, devuelve un error 404
        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }

        // Cambia el estado a "Inactivo" en lugar de eliminar el registro
        comentario.estado = "Inactivo";
        await comentario.save();

        return res.status(200).json({ message: "Comentario desactivado correctamente" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = { getComentarioById, addComentario, desactivarComentario };