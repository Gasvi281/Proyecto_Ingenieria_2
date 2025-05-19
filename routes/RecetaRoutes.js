const express = require("express");
const router = express.Router();
const RecetaController = require("../controllers/RecetaController");
const authService = require("../services/authService");

router.get("/", authService, RecetaController.getRecetas);
router.get("/id/:id", authService, RecetaController.getRecetaById);
router.get("/nombre/:nombre", authService, RecetaController.getRecetaByNombre);
router.post("/", authService, RecetaController.addReceta);
router.put("/:id", authService, RecetaController.editarReceta);
router.post("/ingrediente/:id", authService, RecetaController.agregarIngrediente);
router.put("/ingrediente/:id", authService, RecetaController.eliminarIngrediente);
router.put("/desactivar/:id", authService, RecetaController.changeRecetaStatus);

module.exports = router;