const express = require("express");
const router = express.Router();
const ProductoController = require("../controllers/ProductoController");
const authService = require("../services/authService");

router.get("/:id", authService, ProductoController.getProductoById);
router.get("/:nombreProducto", authService, ProductoController.getProductoByNombre);
router.get("/", authService, ProductoController.getProductos);
router.post("/CreateProduct", authService, ProductoController.addProducto);
router.put("/:id", authService, ProductoController.updateProducto);
router.put("/cambiarEstado/:id", authService, ProductoController.desactivarProducto);

module.exports=router;