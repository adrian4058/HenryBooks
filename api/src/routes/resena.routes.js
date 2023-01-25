const { Router} = require("express");
const { crearResena,resenasPorIDl } = require("../controllers/resenasControllers");
const router = Router();

router.post('/',crearResena)
router.get('/',resenasPorIDl)


module.exports=router