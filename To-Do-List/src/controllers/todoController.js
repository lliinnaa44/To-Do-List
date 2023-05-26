const Todo = require("../models/todo");

// Route handler for creating a new todo item
exports.createTodo = async (req, res) => {
    try {
      const todo = new Todo({
        todo: req.body.todo,
        check: req.body.check,
        username: req.session.user,
      });
  
      const savedTodo = await todo.save();
      res.send(savedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  };

// Route handler for editing a todo item
exports.editTodo = (req, res) => {
    Todo.findOneAndUpdate(
      { _id: req.params.id },
      { todo: req.body.todo },
      { new: true }
    )
      .then((doc) => {
        console.log("item edited!");
  
        // Send response back with the updated document object
        res.send(doc);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  };
  
// Route handler for editing a checkbox
exports.editCheckbox = (req, res) => {
    Todo.findOneAndUpdate(
      { _id: req.params.id },
      { check: req.body.check },
      { new: true }
    )
      .then((doc) => {
        console.log("checkbox edited!");
  
        // Send response back with the updated document object
        res.send(doc);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  };
  
// Route handler for deleting a todo item
exports.deleteTodo = (req, res) => {
    Todo.findOneAndDelete({ _id: req.params.id })
      .then((doc) => {
        // Send response back with the deleted document object
        res.send(doc);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  };
  
