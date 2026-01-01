const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");
const estudiantesController = require("../controllers/estudiantesController");
const profesoresController = require("../controllers/profesoresController");
const cursosController = require("../controllers/cursosController");

router.get("/", indexController.home);

// Estudiantes
router.get("/estudiantes", estudiantesController.getAll);
router.get("/estudiantes/:id", estudiantesController.getById);
router.post("/estudiantes", estudiantesController.create);
router.put("/estudiantes/:id", estudiantesController.update);
router.delete("/estudiantes/:id", estudiantesController.remove);

// Profesores
router.get("/profesores", profesoresController.getAll);
router.get("/profesores/:id", profesoresController.getById);
router.post("/profesores", profesoresController.create);
router.put("/profesores/:id", profesoresController.update);
router.delete("/profesores/:id", profesoresController.remove);

// Cursos
router.get("/cursos", cursosController.getAll);
router.get("/cursos/:id", cursosController.getById);
router.post("/cursos", cursosController.create);
router.put("/cursos/:id", cursosController.update);
router.delete("/cursos/:id", cursosController.remove);

module.exports = router;
