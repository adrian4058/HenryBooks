const { Router } = require("express");
const { 
    getUsuarios 
} = require("../controllers/usuarioController");

const router =Router();

router.get('/',getUsuarios)

module.exports = router;
