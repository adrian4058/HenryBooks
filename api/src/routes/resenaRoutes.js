const { Router } = require("express");
const {
  crearResena,
  resenasPorIDl,
  denunciasId,
  aumentoPorId,
  resenasDenuncias,
} = require("../controllers/resenasControllers");
const router = Router();

router.post("/", crearResena);
router.get("/", resenasPorIDl);
router.get('/denuncias',denunciasId);
router.put('/denuncias',aumentoPorId)
router.get('/denunciatodas',resenasDenuncias)

module.exports = router;
