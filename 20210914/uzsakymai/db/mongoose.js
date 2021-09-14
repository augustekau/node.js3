//pirmas zingsnis
const mongoose = require("mongoose");

const connectionURL = "mongodb://127.0.0.1:27017";
// cia sukuriame duomenu bazes pavadinima (mongoDB)
const dbName = "order";
//Mongoose jungiasi prie mongo db
mongoose.connect(connectionURL + "/" + dbName, {});
