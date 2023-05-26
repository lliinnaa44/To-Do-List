const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Route for when a user submits a new todo item
router.post("/todo", todoController.createTodo);

// Route for when a user edits a todo item
router.put("/todo/:id", todoController.editTodo);

// Route for when a user edits a checkbox
router.put("/check/:id", todoController.editCheckbox);

// Route for when a user deletes a todo item
router.delete("/todo/:id", todoController.deleteTodo);

module.exports = router;
