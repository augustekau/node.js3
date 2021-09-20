const express = require("express");
require("./db/mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(feedbackRoutes);
app.use(userRoutes);

app.listen(3000);
