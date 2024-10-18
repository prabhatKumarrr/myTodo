const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", (req, res) => {
  res.json({
    msg: "Signup Route",
  });
});

userRouter.post("/login", (req, res) => {
  res.json({
    msg: "Login Route",
  });

});

userRouter.get("/test", (req, res) => {
  res.render("main");
});

module.exports = {
  userRouter
}
