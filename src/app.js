require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const { userRouter } = require("./routes/userRoutes");
const { entryRouter } = require("./routes/entryRoute");
const { todoRouter } = require("./routes/todoRoutes");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json()); //Body-Parser


// route handlers
app.use("/myTodo", entryRouter);
app.use("/myTodo/user", userRouter);
app.use("/myTodo/todoOp", todoRouter);



//Template Engine Config
app.use("/statics", express.static("public"));
app.set("view engine", "html");
app.engine("html", require("hbs").__express);
app.set("views", "views");

async function main() {
  //Database Connection
  await mongoose.connect(process.env.MONGO_URL);
  console.log("DB Connected");

  app.listen(port, () => {
    console.log("The server is running on port  --  " + port);
  })
}

main();
