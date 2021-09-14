//antras zingsnis
const mongoose = require("mongoose");
// const validator = require("validator");

//const geriau rasyti is didziosios raides, nes persikejus i servicesoutes.js mes ji naudosime kaip klase
// -- mongoose.model("Service"-- cia service yra collection name, tik mongoDB prides s raide gale (bus services)
const Service = mongoose.model("Service", {
  name: {
    type: String,
    maxLenght: 160,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = Service;
