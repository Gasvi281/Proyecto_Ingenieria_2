const express = require("express");
const router = express.Router();
const CuentaController = require("../controllers/CuentaController");
const authService = require("../services/authService");

router.get("/:id", authService, CuentaController.getCuentaById); //id?
router.get("/:nombreUsuario", authService, CuentaController.getCuentaByNombreUsuario);
router.post("/CreateAccount", CuentaController.addCuenta);

router.put("/:id", authService, CuentaController.updateCuenta); //id?
router.put("/cambiarEstado/:id", authService, CuentaController.desactivarCuenta);

router.post("/pref/:id", authService, CuentaController.agregarPreferencia);
router.put("/pref/:id", authService, CuentaController.eliminarPreferencia);

router.post("/imp/:id", authService, CuentaController.agregarImpedimento);
router.put("/imp/:id", authService, CuentaController.eliminarImpedimento);

module.exports = router;