const express = require("express");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

// route handlers

app.use(express.static("public"));

app.listen(port, () => {
  console.log("The server is running on port  --  " + port);
})
