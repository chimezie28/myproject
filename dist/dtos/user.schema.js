"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// Password regex to ensure: uppercase, lowercase, number, and special character
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
// CreateUserDto schema
exports.createUserSchema = zod_1.z.object({
    full_name: zod_1.z.string().min(1, 'Full name is required'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(strongPasswordRegex, {
        message: 'must contain at least one upper case letter, one lower case letter, one digit and one special character',
    }),
});
// LoginUserDto schema
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
// ForgotPasswordDto schema
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
});
// ResetPasswordDto schema
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Token is required'),
    newPassword: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(strongPasswordRegex, {
        message: 'must contain at least one upper case letter, one lower case letter, one digit and one special character',
    }),
});
