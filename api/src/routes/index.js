const express = require("express");
const router = express.Router();
const autores = require("./autorRoutes");
const books = require("./librosRoutes");
const resenas = require("./resenaRoutes");
const payment = require("./paymentRoute");
const auth= require("./authRoutes")
const usuarios=require('./usersRoutes')

router.use("/book", books);
router.use("/autores", autores);
router.use("/payment", payment);
router.use("/resena", resenas);
router.use('/auth',auth)
router.use('/users',usuarios)

module.exports = router;
