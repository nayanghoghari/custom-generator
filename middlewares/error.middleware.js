const { ApiError, NotFoundError } = require("../utils/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
};

const notFoundHandler = (req, res, next) => {
  throw new NotFoundError("Page Not Found!")
};

module.exports = { errorHandler, notFoundHandler };
