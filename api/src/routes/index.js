const express = require("express");
const router = express.Router();
const autores = require("./autorRoutes");
const books = require("./librosRoutes");
const resenas = require("./resenaRoutes");

router.use("/book", books);
router.use("/autores", autores);
router.use("/resena", resenas);

module.exports = router;
