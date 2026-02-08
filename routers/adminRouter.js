const express = require("express");
const { adminController } = require("../controllers/adminController");
const router = express.Router();
 

router.get("/get", adminController);

module.exports = router;        