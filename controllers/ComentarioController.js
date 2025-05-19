const { Cuenta, Comentario } = require("../models");

const getComentarioById = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await Comentario.findByPk(id);

        if (!comentario) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }

        return res.status(200).json(comentario);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const getComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.findAll({
            include: {
                model: Cuenta,
                as: "cuenta",
                attributes: ['id', 'nombreUsuario']
            }
        });

        return res.status(200).json(comentarios);
    } catch (error) {
        return res.status(404).json({ error: "No se encontraron los comentarios" })

    }
}

const updateComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            comentario
        } = req.body;
        const comment = await Comentario.findByPk(id);

        if (!comment) {
            return res.status(404).json({ message: "comentario no encontrado" });
        }
        if (comentario) comment.comentario = comentario;

        await comment.save();
        return res.status(200).json({ message: "Comentario actualizado", comment });


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const addComentario = async (req, res) => {
    try {

        const { id } = req.params

        const {
            comentario
        } = req.body;

        const cuenta = await Cuenta.findByPk(id)

        if (!cuenta) {
            return res.status(404).json({ error: "Cuenta no encontrada" })
        }

        const comment = await Comentario.create({
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
        const { id } = req.params; // ID del usuario recibido en la URL
        const { estado } = req.body; // Estado recibido en el cuerpo de la petición

        // Validar que el estado sea "Activo" o "Inactivo"
        if (!["Activo", "Inactivo"].includes(estado)) {
            return res.status(400).json({ error: "Estado inválido. Use 'Activo' o 'Inactivo'." });
        }

        // Buscar el usuario por ID
        const comment = await Comentario.findByPk(id);
        if (!comment) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }

        // Actualizar el estado del usuario
        comment.estado = estado;
        await comment.save();

        res.json({ message: `Estado actualizado a ${estado}`, comment });
    } catch (error) {
        console.error("Error al cambiar estado:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


module.exports = { getComentarioById, getComentarios, addComentario, desactivarComentario, updateComentario };