const express = require("express");
const router = express.Router();
const RecetaController = require("../controllers/RecetaController");
const authService = require("../services/authService");

router.get("/", authService, RecetaController.getRecetas);
router.get("/:nombre", authService, RecetaController.getRecetaByNombre);

module.exports = router;