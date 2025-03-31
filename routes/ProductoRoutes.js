const express = require("express");
const router = express.Router();
const ProductoController = require("../controllers/ProductoController");
const authService = require("../services/authService");

router.get("/:id", authService, ProductoController.getProductoById);
router.get("/:nombreProducto", authService, ProductoController.getProductoByNombre);
router.post("/CreateProduct", authService, ProductoController.addProducto);

module.exports=router;