const express = require("express");
const router = express.Router();
const CuentaController = require("../controllers/CuentaController");
const authService = require("../services/authService");

router.get("/:id", authService, CuentaController.getCuentaById); //id?
router.post("/CreateAccount", CuentaController.addCuenta);

router.put("/:id", authService, CuentaController.updateCuenta); //id?
router.put("/cambiarEstado/:id", authService, CuentaController.desactivarCuenta);

module.exports = router;