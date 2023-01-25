
const express = require("express");
const router = express.Router();
const autores=require('./autor.routes')
const books = require("./librosRoutes");
const resenas=require("./resena.routes")

router.use("/book", books)
router.use('/autores',autores)
router.use("/resena", resenas)

module.exports = router;
