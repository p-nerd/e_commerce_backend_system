const response = (
    res,
    message,
    data = null,
    status = 200,
    success = true,
    error = false
) => {
    return res.status(status).send(new Response(message, data, success, error));
};

class Response {
    constructor(message, data, success = true, error = false) {
        (this.success = success), (this.error = error);
        (this.message = message), (this.data = data);
    }
}

class GeneralError extends Error {
    constructor(data) {
        super();
        this.data = data;
        this.message = "General Error";
        this.status = 400;
    }
}

class BadRequestError extends GeneralError {
    constructor(data) {
        super(data);
        this.message = "Bad Request Error";
        this.status = 400;
    }
}

class NotFoundError extends GeneralError {
    constructor(data) {
        super(data);
        this.message = "Not Found Error";
        this.status = 404;
    }
}

class RequestValidationError extends GeneralError {
    constructor(data) {
        super(data);
        this.message = "Request Validation Error";
        this.status = 400;
    }
}

class DuplicateKeyError extends GeneralError {
    constructor(data) {
        super(data);
        this.message = "Duplicate Key Error";
        this.status = 400;
    }
}

class InternalSeverError extends GeneralError {
    constructor(data) {
        super(data);
        this.message = "Internal Server Error";
        this.status = 500;
    }
}

class UnauthorizedError extends GeneralError {
    constructor(data) {
        super(data);
        this.message = "Unauthorized Error";
        this.status = 401;
    }
}

class ForbiddenError extends GeneralError {
    constructor(data) {
        super(data);
        this.message = "Forbidden Error";
        this.status = 403;
    }
}

module.exports = {
    response,
    Response,
    GeneralError,
    NotFoundError,
    RequestValidationError,
    DuplicateKeyError,
    InternalSeverError,
    UnauthorizedError,
    ForbiddenError,
    BadRequestError
};
