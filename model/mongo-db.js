const mongoose = require("mongoose");

const mongoDB = "mongodb://localhost:27017/facebookauth";

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

var userSchema = mongoose.Schema({
  uid: String,
  fullname: String,
  email: String,
  gender: String,
  pic: String,
});

var User = mongoose.model("Users", userSchema);

// const user = User.findOne({ uid: "4119223728191617" }, (error, user) => {
//   console.log(user);
// });

module.exports = User;
