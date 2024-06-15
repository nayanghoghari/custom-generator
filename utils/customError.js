// CustomError.js
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Example custom error classes
class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

module.exports = { ApiError, NotFoundError, UnauthorizedError }