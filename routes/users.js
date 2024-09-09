const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/newDataBase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  categories: {
    type: Array,
    default: []
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
