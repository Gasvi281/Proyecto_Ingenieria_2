const express = require("express");
const router = express.Router();
const ComentarioController = require("../controllers/ComentarioController");
const authService = require("../services/authService");

router.post("/CreateComment/:id", authService, ComentarioController.addComentario);
router.put("/cambiarEstado/:id", authService, ComentarioController.desactivarComentario);
router.get("/:id", authService, ComentarioController.getComentarioById);
router.get("/", authService, ComentarioController.getComentarios);
router.put("/:id", authService, ComentarioController.updateComentario)

module.exports = router;