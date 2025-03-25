const { Cuenta, Comentario } = require("../models");

const getComentarioByUsername = async (req, res) => {
    try {
        const { nombreUsuario } = req.params;

        const comentario = await Comentario.findOne({where:{nombreUsuario}});

        if (!comentario) {
            res.status(404).json({ error: "uPS" });
        }

        res.status(200).json(comentario);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const addComentario = async (req, res) => {
    try {
        const { nombreUsuario,
            email,
            nombre,
            comentario
            // fotoPerfil
        } = req.body;

        const cuenta= await Cuenta.findOne({where:{nombreUsuario}})

        const comment= await Comentario.create({
            comentario,
            nombreUsuario: cuenta.nombreUsuario,

        })


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
        res.status(500).json({ error: error.message });
    }
};


module.exports = { getComentarioByUsername, addComentario, desactivarComentario };