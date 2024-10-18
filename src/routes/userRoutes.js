const { Router } = require("express");
const userRouter = Router();
const { loginInput, signupInput } = require("../middlewares/inputValidation");
const { passHash } = require("../middlewares/passHashing");
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

// SignUp
userRouter.post("/signup", signupInput, passHash, async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  
  try{
    await userModel.create({
      firstName,
      lastName,
      email,
      username,
      password,
      myTodo: [],
    });

    res.status(200).json({
      msg: "Signup Successfull!!",
    });
  }
  catch(e) {
    res.status(405).json("Duplicate Value: Email or Username already exists");
  }
});



// Login
userRouter.post("/login", loginInput, async (req, res) => {
  const user = req.body.username;
  const pass = req.body.password;

  const userMatch = await userModel.findOne({
    username: user,
  });

  const emailMatch = await userModel.findOne({
    email: user,
  });

  if(userMatch || emailMatch) {
    let userDB;
    if(userMatch) {
      userDB = userMatch;
    }
    else {
      userDB = emailMatch;
    }

    const hash = userDB.password;

    const result = await bcrypt.compare(pass, hash);

    if(!result) {
      res.status(405).json({
        msg: "Incorrect Password"
      });
    }
    else {
      const token = await jwt.sign({
        userId: userDB._id,
      }, JWT_KEY);

      
      res.status(200).json({
        token: token,
        message: "User Logged In Successfully!!"
      });
    }
  }
  else {
    res.status(404).json({
      message: "User does not Exist!!",
    });
  }
});



//Main Entry Page
userRouter.get("/test", (req, res) => {
  res.render("main");
});

module.exports = {
  userRouter
}
