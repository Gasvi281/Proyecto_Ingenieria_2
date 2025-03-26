const express = require("express");
const router = express.Router();
const ProductoController = require("../controllers/ProductoController");

router.get("/:id", ProductoController.getProductoById);
router.get("/:nombreProducto", ProductoController.getProductoByNombre);
router.post("/CreateProduct", ProductoController.addProducto);

module.exports=router;