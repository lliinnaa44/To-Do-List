const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");

const User = require("../models/user");

// Handle user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render("register", { message: "Username or email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await User.create({
      username,
      password: hashedPassword,
      email
    });

    // Redirect to index or any desired route
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.render("register", { message: "An error occurred during registration." });
  }
};

// Handle user login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database based on the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { message: "Email or password is incorrect." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.render("login", { message: "Email or password is incorrect." });
    }

    // Redirect to index or any desired route after successful login
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return res.render("login", { message: "An error occurred during login." });
      }
      req.session.user = user.username;
      return res.redirect("/");
    });

    
  } catch (error) {
    console.error(error);
    res.render("login", { message: "An error occurred during login." });
  }
};


// Validate register input
exports.validateRegister = (req, res, next) => {
  const { username, password, email } = req.body;

  if (
    validator.isAlphanumeric(username) &&
    validator.isAlphanumeric(password) &&
    validator.isEmail(email)
  ) {
    return next();
  }

  res.render("register", { message: "Invalid input. Try again." });
};