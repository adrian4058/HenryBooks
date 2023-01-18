const express = require("express");
const router = express.Router();
const {
  createBook,
  allBooks,
  updateBook,
  findBook,
} = require("../controllers/libroController");

router.post("/", createBook);
router.get("/", allBooks);
router.get("/:id", findBook); //ruta no testeada
router.put("/:id", updateBook); //ruta no testeada

module.exports = router;
