const express = require("express");
const router = express.Router();
const books = require("./librosRoutes");

router.use("/book", books)

module.exports = router;
