const { Router } = require("express");
const {
  autores,
  crearAutor,
  eliminarAutor,
  editarAutor,
  autorId,
} = require("../controllers/autorController");

const router = Router();

router.get("/", autores);
router.post("/", crearAutor);
router.delete("/", eliminarAutor);
router.put("/", editarAutor);
router.get("/:idAutor", autorId);

module.exports = router;
