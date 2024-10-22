const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

async function auth(req, res, next) {
  const token = req.headers.token;
  
  try {
    const userAuth = await jwt.verify(token, JWT_KEY);

    if(userAuth){
      req.body.userId = userAuth.userId;
      next();
    }
  } catch(e) {
    if(e) {
      res.status(403).json({
        message: "Invalid Token"
      });
    }
  }
}

module.exports = {
  auth
}
