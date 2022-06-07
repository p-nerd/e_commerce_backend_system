class GeneralError extends Error {
    constructor(message) {
        super();
        this.message = message;
        this.name = "General Error";
        this.status = 400;
    }
}

class BadRequestError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "Bad Request Error";
        this.status = 400;
    }
}

class NotFoundError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "Not Found Error";
        this.status = 404;
    }
}

class RequestValidationError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "Request Validation Error";
        this.status = 400;
    }
}

class DuplicateKeyError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "Duplicate Key Error";
        this.status = 400;
    }
}

class InternalSeverError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "Internal Server Error";
        this.status = 500;
    }
}

class UnauthorizedError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "Unauthorized Error";
        this.status = 401;
    }
}

class ForbiddenError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "Forbidden Error";
        this.status = 403;
    }
}

class RedisError extends GeneralError {
    constructor(message) {
        super(message);
        this.name = "Redis Error";
        this.stack = 500
    }
}

module.exports = {
    GeneralError,
    NotFoundError,
    RequestValidationError,
    DuplicateKeyError,
    InternalSeverError,
    UnauthorizedError,
    ForbiddenError,
    BadRequestError,
    RedisError
}