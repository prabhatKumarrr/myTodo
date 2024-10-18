const bcrypt = require("bcrypt");

async function passHash(req, res, next) {
  const pass = req.body.password;

  const hash = await bcrypt.hash(pass, 10);

  req.body.password = hash;
  next();
}

module.exports = {
  passHash
}
