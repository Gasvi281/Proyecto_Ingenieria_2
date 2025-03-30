const express = require("express");
const router = express.Router();
const ListaCompraController = require("../controllers/ListaCompraController");
const authService = require("../services/authService");

router.get("/:id", authService, ListaCompraController.getListaById);
router.post("/:id", authService, ListaCompraController.addListaCompra);
router.post("/list/:id", authService, ListaCompraController.agregarProducto);
router.put("/:id", authService, ListaCompraController.eliminarProducto);

module.exports = router;