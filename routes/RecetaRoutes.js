const express = require("express");
const router = express.Router();
const RecetaController = require("../controllers/RecetaController");
const authService = require("../services/authService");

router.get("/", authService, RecetaController.getRecetas);
router.get("/:id", authService, RecetaController.getRecetaById);
router.get("/:nombre", authService, RecetaController.getRecetaByNombre);
router.post("/", authService, RecetaController.addReceta);
router.put("/", authService, RecetaController.editarReceta);
router.post("/ingrediente/:id", authService, RecetaController.agregarIngrediente);
router.put("/ingrediente/:id", authService, RecetaController.eliminarIngrediente);

module.exports = router;