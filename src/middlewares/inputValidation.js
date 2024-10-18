const z = require("zod");

const userSignup = z.object({
  firstName: z.string().max(20),
  lastName: z.string().max(20),
  email: z.string().email({"message": "Invalid Email"}),
  username: z.string().max(30),
  password: z.string().min(8, {"message": "Should be atleast 8 characters long"})
});

const userLogin = z.object({
  username: z.string().max(30),
  password: z.string().min(8, {"message": "Should be atleast 8 characters long"})
});

async function signupInput(req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  const validation = await userSignup.safeParse({
    firstName,
    lastName,
    email,
    username,
    password
  });

  if(validation.success) {
    next();
  }
  else {
    res.status(403).json({
      message: "Invalid Input"
    });
  }
}

async function loginInput(req, res, next) {
  const user = req.body.username;
  const pass = req.body.password;

  const validation = await userLogin.safeParse({
    username: user,
    password: pass
  });

  if(validation.success) {
    next();
  }
  else {
    res.status(403).json({
      message: "Invalid Input"
    });
  }
}





module.exports = {
  signupInput,
  loginInput
}
