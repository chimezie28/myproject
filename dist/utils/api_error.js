"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        // Maintain the stack trace for debugging
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
    // Method to send the error response
    static sendErrorResponse(res, error) {
        return res.status(error.statusCode).json({
            message: error.message,
        });
    }
}
exports.default = ApiError;
