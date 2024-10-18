const { Router } = require("express");
const entryRouter = Router();

entryRouter.get("/", (req, res) => {
  res.render("index");
});

entryRouter.get("/signup", (req, res) => {
  res.render("register");
});

entryRouter.get("/main", (req, res) => {
  res.render("main");
});


module.exports = { entryRouter };
