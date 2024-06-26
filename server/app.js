const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const passport = require("passport");
const bodyparser = require("body-parser");
const morgan = require('morgan');

const app = express();
const router = require("../routers/index.router");
const { errorHandler, notFoundHandler } = require("../middlewares/error.middleware");
const { connectDB } = require("../utils/index.utils");
require("../middlewares/auth.middleware")

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(morgan("dev"));

app.use("/", router);
app.use(notFoundHandler)
app.use(errorHandler); 

connectDB(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.log("error connecting database!");
  });
