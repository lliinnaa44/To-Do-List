const Todo = require("../models/todo");

// Middleware to authenticate user
exports.authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("authentication = " + req.isAuthenticated());
    return next();
  }
  res.redirect("login");
};

// Route handler for "/" route
exports.index = async (req, res) => {
  try {
    const result = await Todo.find({ username: req.session.user });
    res.render("index", { todos: result, username: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
