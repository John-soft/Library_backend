const express = require("express");
const app = express();
const usersRoute = require("./routes/usersRoute");

app.use(express.json());
app.use("/api/v1/users", usersRoute);

module.exports = app;
