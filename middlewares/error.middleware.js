const { ApiError, NotFoundError } = require("../utils/customError");
const { ValidationError } = require('express-validation')

function getResponseMessage(err) {
  let message;
  if (err.details?.body) return (message = err.details?.body[0].message);
  if (err.details?.params) return (message = err.details?.params[0].message);
  if (err.details?.query) return (message = err.details?.query[0].message);
}

const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ error: getResponseMessage(err) });
  }
  res.status(err.statusCode || 500).json({ error: err.message || "Something went wrong" });
};

const notFoundHandler = (req, res, next) => {
  throw new NotFoundError("Page Not Found!")
};

module.exports = { errorHandler, notFoundHandler };
