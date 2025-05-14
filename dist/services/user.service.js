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
exports.UserService = void 0;
const users_1 = __importDefault(require("../models/users"));
const password_utils_1 = require("../utils/password.utils");
const jwt_util_1 = require("../utils/jwt.util");
const crypto_1 = __importDefault(require("crypto"));
const api_error_1 = __importDefault(require("../utils/api_error"));
// const JWT_SECRET = process.env.JWT_SECRET;  // Make sure this is in your .env file!
const nodemailer_1 = __importDefault(require("nodemailer"));
class UserService {
    register(userDto, req) {
        return __awaiter(this, void 0, void 0, function* () {
            // Step 1: Normalize and clean data
            const email = userDto.email.trim().toLowerCase();
            const full_name = userDto.full_name;
            // Step 2: Check for duplicate email
            const existing = yield users_1.default.findOne({ where: { email } });
            if (existing) {
                throw new api_error_1.default('This email has been used to create an existing account', 409);
            }
            // Step 3: Encrypt password
            const password = yield (0, password_utils_1.hashPassword)(userDto.password);
            // Step 5: Create user
            const user = yield users_1.default.create({
                full_name,
                email,
                password
            });
            // Step 6: Generate session token and update user session ID
            const token = (0, jwt_util_1.generateToken)({ id: user.id, email: user.email });
            const session_id = (0, jwt_util_1.getSessionIdFromToken)(token);
            yield user.update({ unique_session_id: session_id });
            // await sendConfirmationEmail(user);
            // Step 8: Return serialized user and token
            return {
                user, // or `UserSerializer.serialize(user)` if you have a serializer
                token,
            };
        });
    }
    login(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const user = yield users_1.default.findOne({ where: { email } });
            if (!user || !(yield (0, password_utils_1.comparePasswords)(password, user.password))) {
                throw new Error('Invalid credentials');
            }
            return user;
        });
    }
    forgotPassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            const token = crypto_1.default.randomBytes(20).toString('hex');
            const user = yield users_1.default.findOne({ where: { email } });
            if (!user)
                throw new Error('User not found');
            user.reset_password_token = token;
            const transporter = nodemailer_1.default.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'petertechy01@gmail.com',
                    pass: 'cwko ojme cgys qzqo',
                },
            });
            const resetLink = `https://insemigen-marketplace-backend-9.onrender.com/${token}`;
            yield transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Password Reset',
                text: `Click the link to reset your password: ${resetLink}`,
            });
            return token;
        });
    }
    resetPassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ token, newPassword }) {
            const user = yield users_1.default.findOne({ where: { reset_password_token: token } });
            if (!user)
                throw new Error('Invalid token');
            user.password = yield (0, password_utils_1.hashPassword)(newPassword);
            // user.reset_password_token = null;
            yield user.save();
            return user;
        });
    }
}
exports.UserService = UserService;
