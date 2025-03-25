const express = require("express");
const router = express.Router();
const ListaCompraController = require("../controllers/ListaCompraController");

router.get("/", ListaCompraController.getListaById);
router.post("/", ListaCompraController.addListaCompra);

module.exports = router;