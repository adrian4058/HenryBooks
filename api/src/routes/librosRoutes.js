const express = require("express");
const router = express.Router();
const {
  createBook,
  allBooks,
  updateBook,
  findBook,
  ordenAlfabetico,
} = require("../controllers/libroController");
const { verifyToken, isAdmin } = require("../middleware");

// router.post("/", createBook);
router.post("/", createBook);
router.get("/", allBooks);
router.get("/:id", findBook);
router.put("/:id", updateBook);

router.get("/orden/az", ordenAlfabetico);

module.exports = router;
