export default class ApiError extends Error {
    public statusCode: number;
    public message: string;
  
    constructor(message: string, statusCode: number = 500) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      // Maintain the stack trace for debugging
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ApiError);
      }
    }
  
    // Method to send the error response
    public static sendErrorResponse(res: any, error: ApiError) {
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }
  }
  