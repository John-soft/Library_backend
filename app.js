const express = require("express");
const app = express();
const usersRoute = require("./routes/usersRoute");
const booksRoute = require("./routes/booksRoute");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { notFound, globalErrorHandler } = require("./middlewares/errorHandler");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

app.use("/files", express.static("files"));
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/books", booksRoute);

app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
