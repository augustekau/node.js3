const mongoose = require("mongoose");
const validator = require("validator");

const Feedback = mongoose.model("Feedback", {
  name: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 24,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxLenght: 32,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("El. pastas neteisingas");
      }
    },
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = Feedback;
