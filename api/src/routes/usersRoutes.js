const { Router } = require("express");
const { 
    getUsuarios,
    getUsuarioById,
    editUsuario
} = require("../controllers/usuarioController");

const router =Router();

router.get('/',getUsuarios)
router.get('/:id',getUsuarioById)
router.put('/:id',editUsuario)

module.exports = router;
