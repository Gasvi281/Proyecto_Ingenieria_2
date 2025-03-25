const express = require("express");
const router = express.Router();
const ComentarioController = require("../controllers/ComentarioController");

router.post("/", ComentarioController.addComentario);
router.put("/", ComentarioController.desactivarComentario);
router.get("/:nombreUsuario", ComentarioController.getComentarioByUsername);

module.exports = router;