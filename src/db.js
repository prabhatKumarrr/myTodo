const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  myTodo: Array,
});

const userModel = mongoose.model("myTodoUser", userSchema);

module.exports = {
  userModel
}
