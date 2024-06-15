const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { connectDB } = require("../utils/index.utils");
const app = express();
const router = require("../routers/index.router");
const { errorHandler, notFoundHandler } = require("../middlewares/error.middleware");
const { NotFoundError } = require("../utils/customError");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use(notFoundHandler)
app.use(errorHandler); 

connectDB(process.env.DB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is listening...");
    });
  })
  .catch((err) => {
    console.log("error connecting database!");
  });
