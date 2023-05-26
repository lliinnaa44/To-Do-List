const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();

const User = require("../models/user");
const authController = require("../controllers/authController");

router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/register", function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../");
  } else {
    res.render("register", { message: undefined });
  }
});

router.post("/register", authController.validateRegister, authController.registerUser);

router.get("/login", function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../");
  } else {
    res.render("login", { message: undefined });
  }
});

router.post("/login", authController.loginUser);



module.exports = router;
