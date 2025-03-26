const express = require("express");
const router = express.Router();
const ListaCompraController = require("../controllers/ListaCompraController");
const authService = require("../services/authService");

router.get("/:id", authService, ListaCompraController.getListaById);
router.post("/:id", authService, ListaCompraController.addListaCompra);

module.exports = router;