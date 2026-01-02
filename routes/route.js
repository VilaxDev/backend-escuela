const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");
const transaccionesController = require("../controllers/transaccionesController");
const reservacionesController = require("../controllers/reservacionesController");
const recordatoriosController = require("../controllers/recordatoriosController");
const usersController = require("../controllers/usersController");

// Usuarios
router.post("/users/auth", usersController.auth);
router.post("/users", usersController.create);
router.put("/users/update/:id", usersController.update);

// Página principal
router.get("/", indexController.home);

// Transacciones
router.get("/transacciones", transaccionesController.getAll);
router.get("/transacciones/:id", transaccionesController.getById);
router.post("/transacciones", transaccionesController.create);
router.put("/transacciones/update/:id", transaccionesController.update);
router.delete("/transacciones/delete/:id", transaccionesController.remove);

// Reservaciones
router.get("/reservaciones", reservacionesController.getAll);
router.get("/reservaciones/:id", reservacionesController.getById);
router.post("/reservaciones", reservacionesController.create);
router.put("/reservaciones/update/:id", reservacionesController.update);
router.delete("/reservaciones/delete/:id", reservacionesController.remove);

// Recordatorios
router.get("/recordatorios", recordatoriosController.getAll);
router.get("/recordatorios/:id", recordatoriosController.getById);
router.post("/recordatorios", recordatoriosController.create);
router.put("/recordatorios/update/:id", recordatoriosController.update);
router.delete("/recordatorios/delete/:id", recordatoriosController.remove);

module.exports = router;
