"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const api_error_1 = __importDefault(require("./api_error")); // Custom Error Handler
const sendResponse = (req_1, res_1, ...args_1) => __awaiter(void 0, [req_1, res_1, ...args_1], void 0, function* (req, res, payload = {}, statusCode = 200, message = "") {
    try {
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader("X-Frame-Options", "deny");
        res.setHeader("Content-Security-Policy", "default-src 'none'");
        res.setHeader("Permissions-Policy", "fullscreen=()");
        res.setHeader("Strict-Transport-Security", "max-age=31536000");
        res.setHeader("Referrer-Policy", "no-referrer");
        return res.status(statusCode).json(Object.assign({ message: message || (statusCode === 200 ? "Request successful" : "Request failed") }, payload));
    }
    catch (error) {
        throw new api_error_1.default("Error encountered sending request");
    }
});
exports.sendResponse = sendResponse;
