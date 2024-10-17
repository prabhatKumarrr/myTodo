const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

// route handlers

app.use(express.static("public"));

async function main() {
  //Database Connection
  await mongoose.connect(process.env.MONGO_URL);
  console.log("DB Connected");

  app.listen(port, () => {
    console.log("The server is running on port  --  " + port);
  })
}

main();
