const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    //tiksrins kad nebutu keliu vienodu emailu sistemoje
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Neteisingas el.pastas");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Slaptazodis per paprastas");
      }
    },
  },
});

userScheme.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model("User", userScheme);

module.exports = User;
