//antras zingsnis
const mongoose = require("mongoose");
const validator = require("validator");

const Order = mongoose.model("Order", {
  service_id: {
    required: true,
    type: String,
    trim: true,
  },
  name: {
    type: String,
    maxLenght: 24,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    maxLenght: 24,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    maxLenght: 32,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Incorrect email address");
      }
    },
  },
  phone: {
    type: String,
    maxLenght: 16,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Phone is invalid");
      }
    },
  },
});

module.exports = Order;
