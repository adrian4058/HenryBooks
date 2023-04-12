const express = require("express");
const router = express.Router();
const {
  createBook,
  allBooks,
  updateBook,
  findBook,
  ordenAlfabetico,
  createBookc
} = require("../controllers/libroController");
const { verifyToken, isAdmin } = require("../middleware");

// router.post("/", createBook);
router.post("/",createBook)
router.get("/", allBooks);
<<<<<<< HEAD
router.get("/:id", findBook);
router.put("/:id", updateBook);

router.get("/orden/az", ordenAlfabetico);

=======
router.get("/orden/:id", findBook); //ruta no testeada
router.put("/:id", updateBook); //ruta no testeada
router.get("/orden", ordenAlfabetico);
>>>>>>> main
module.exports = router;
