const express = require("express");
const { linkPayment, getPayment } = require("../controllers/paymentController");
const router = express.Router();

router.post("/", linkPayment);


module.exports = router;
