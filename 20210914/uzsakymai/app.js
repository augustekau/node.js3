//pirmas zingsnis
const express = require("express");
require("./db/mongoose");
const servicesRoutes = require("./routes/servicesRoutes");
const orders = require("./routes/orders");

const app = express();

app.use(express.json());
app.use(servicesRoutes);
app.use(orders);

app.listen(3000);
