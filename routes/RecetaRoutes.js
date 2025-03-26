const express = require("express");
const router = express.Router();
const RecetaController = require("../controllers/RecetaController");

router.get("/", RecetaController.getRecetas);
router.get("/:nombre", RecetaController.getRecetaByNombre);

module.exports = router;