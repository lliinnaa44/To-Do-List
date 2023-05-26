
const express = require("express");
const router = express.Router();
const userController = require("../controllers/indexController");

// Route for when the user views the index of the website
router.get("/", userController.authenticateUser, userController.index);

module.exports = router;
