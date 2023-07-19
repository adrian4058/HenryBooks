const express = require("express");
const { mailContent } = require("../controllers/sendMailController");
const router = express.Router();

router.post("/", mailContent);

module.exports = router;
