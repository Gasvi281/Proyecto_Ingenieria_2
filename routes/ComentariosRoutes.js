const express = require("express");
const router = express.Router();
const ComentarioController = require("../controllers/ComentarioController");
const authService = require("../services/authService");

router.post("/:id", authService, ComentarioController.addComentario);
router.put("/", authService, ComentarioController.desactivarComentario);
router.get("/:id", authService, ComentarioController.getComentarioById);

module.exports = router;