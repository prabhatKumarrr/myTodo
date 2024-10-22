const { Router } = require("express");
const todoRouter = Router();
const { auth } = require("../middlewares/authentication");
const { userModel } = require("../db");

 

todoRouter.post("/addTodo", auth, async (req, res) => {
  const userId = req.body.userId;
  const todo = req.body.todo;

  const user = await userModel.findOne({
    _id: userId
  });

  if(user) {
    user.myTodo.push(todo);

    await user.save();

    res.status(200).json({
      message: "Todo added!"
    });
  }
});

todoRouter.get("/allTodos", auth, async (req, res) => {
  const userId = req.body.userId;

  const user = await userModel.findOne({
    _id: userId
  });

  if(user) {
    const todos = user.myTodo;

    res.status(200).json({
      allTodos: todos
    });
  }
});

todoRouter.put("/update", auth, async (req, res) => {
  const userId = req.body.userId;
  const myTodos = req.body.myTodoList;
  
  console.log(myTodos[0]);

  const user = await userModel.findOne({
    _id: userId
  });

  user.myTodo = myTodos;

  await user.save();

  res.json({
    message: "myTodoList Updated!"
  });
});

module.exports = {
  todoRouter
}
