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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.registerUser = void 0;
const user_service_1 = require("../services/user.service");
const jwt_util_1 = require("../utils/jwt.util");
const validateParams_1 = require("../utils/validateParams");
const user_schema_1 = require("../dtos/user.schema");
const generic_serializer_1 = require("../utils/generic.serializer");
const sendResponse_1 = require("../utils/sendResponse");
const userService = new user_service_1.UserService();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validateParams_1.validateParams)(res, 'Validation failed', user_schema_1.createUserSchema, req.body))
        return;
    try {
        const result = yield userService.register(req.body);
        // Extract user and token from the returned result
        const userInstance = result.user;
        const token = result.token;
        const allowedFields = ['id', 'full_name', 'email', 'created_at', 'updated_at'];
        const userData = userInstance.get(); // Raw data from Sequelize instance
        const serializedUser = (0, generic_serializer_1.GenericSerializer)(userData, allowedFields);
        if (typeof serializedUser.id === 'string') {
            serializedUser.id = Number(serializedUser.id);
        }
        // Include the token in the response
        (0, sendResponse_1.sendResponse)(req, res, { user: serializedUser, token }, 200, "User successfully registered");
    }
    catch (err) {
        (0, sendResponse_1.sendResponse)(req, res, { message: err.message }, 400);
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validateParams_1.validateParams)(res, 'Validation failed', user_schema_1.loginUserSchema, req.body))
        return;
    try {
        const user = yield userService.login(req.body);
        const allowedFields = ['id', 'full_name', 'email', 'created_at', 'updated_at'];
        const userData = user.get(); // Raw data from Sequelize instance
        const serializedUser = (0, generic_serializer_1.GenericSerializer)(userData, allowedFields);
        // Ensure ID is a number
        if (typeof serializedUser.id === 'string') {
            serializedUser.id = Number(serializedUser.id);
        }
        const token = (0, jwt_util_1.generateToken)({ id: serializedUser.id, email: serializedUser.email });
        // ✅ Send response using your custom utility
        (0, sendResponse_1.sendResponse)(req, res, { token, user: serializedUser }, 200, "User successfully logged in");
    }
    catch (err) {
        (0, sendResponse_1.sendResponse)(req, res, { message: err.message }, 401);
    }
});
exports.loginUser = loginUser;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validateParams_1.validateParams)(res, 'Validation failed', user_schema_1.forgotPasswordSchema, req.body))
        return;
    try {
        const token = yield userService.forgotPassword(req.body);
        res.status(200).json({ message: 'Token generated', token });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.forgotPassword = forgotPassword;
// export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
//   const { email } = req.body;
//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }
//     const token = crypto.randomBytes(32).toString('hex');
//     const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour
//     await prisma.user.update({
//       where: { email },
//       data: {
//         resetToken: token,
//         resetTokenExpiry: tokenExpiry,
//       },
//     });
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });
//     const resetLink = `http://localhost:3000/reset-password/${token}`;
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Password Reset',
//       text: `Click the link to reset your password: ${resetLink}`,
//     });
//     res.status(200).json({ message: 'Password reset link sent to your email', token });
//   } catch (error) {
//     console.error('Error in forgot-password route:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// export const resetPassword = async (req: Request, res: Response): Promise<void> => {
//   const { token } = req.params;
//   const { password } = req.body;
//   try {
//     const user = await prisma.user.findFirst({
//       where: {
//         resetToken: token,
//         resetTokenExpiry: {
//           gt: new Date(),
//         },
//       },
//     });
//     if (!user) {
//       res.status(400).json({ message: 'Invalid or expired token' });
//       return;
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         password: hashedPassword,
//         resetToken: null,
//         resetTokenExpiry: null,
//       },
//     });
//     res.status(200).json({ message: 'Password has been reset successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, validateParams_1.validateParams)(res, 'Validation failed', user_schema_1.resetPasswordSchema, req.body))
        return;
    try {
        const user = yield userService.resetPassword(req.body);
        res.status(200).json({ message: 'Password reset successful', user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.resetPassword = resetPassword;
