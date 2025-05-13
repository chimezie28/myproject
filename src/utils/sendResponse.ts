import ApiError from "./api_error"; // Custom Error Handler
import { Request, Response } from 'express';

export const sendResponse = async (req: Request, res: Response, payload = {}, statusCode = 200, message = "") => {
    try {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("X-Frame-Options", "deny");
      res.setHeader("Content-Security-Policy", "default-src 'none'");
      res.setHeader("Permissions-Policy", "fullscreen=()");
      res.setHeader("Strict-Transport-Security", "max-age=31536000");
      res.setHeader("Referrer-Policy", "no-referrer");
  
      return res.status(statusCode).json({
        message: message || (statusCode === 200 ? "Request successful" : "Request failed"),
        ...payload,
      });
    } catch (error) {
      throw new ApiError("Error encountered sending request");
    }
  };
