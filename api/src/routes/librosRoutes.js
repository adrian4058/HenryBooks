const express = require("express");
const router = express.Router();
const { createBook } = require("../controllers/libroController");

router.post("/", createBook);

module.exports = router;
