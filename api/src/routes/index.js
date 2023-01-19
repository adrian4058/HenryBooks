
const express = require("express");
const router = express.Router();
const autores=require('./autor.routes')
const books = require("./librosRoutes");

router.use("/book", books)
router.use('/autores',autores)

module.exports = router;
