const express = require("express");
const { linkPayment } = require("../controllers/paymentController");
const router = express.Router();

router.get("/", linkPayment);

module.exports = router;
