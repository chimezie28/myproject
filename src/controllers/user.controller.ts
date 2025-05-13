// import { Request, Response } from 'express';
// import { registerUserSchema } from '../validators/user.validator';
// import { createUser } from '../services/user.service';
// import { loginUserSchema as loginSchema } from '../validators/user.validator'; // Renamed for clarity
// import { loginUser as authenticateUser } from '../services/user.service'; // Renamed for clarity
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { Request, Response, RequestHandler } from 'express';
import { UserService } from '../services/user.service';
import { generateToken } from '../utils/jwt.util';
import { validateParams } from '../utils/validateParams';
import {
  createUserSchema,
  loginUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../dtos/user.schema';
import { GenericSerializer } from '../utils/generic.serializer';
import { sendResponse } from '../utils/sendResponse';
import { TypeOf } from 'zod';
type CreateUserDto = TypeOf<typeof createUserSchema>;
type LoginUserDto = TypeOf<typeof loginUserSchema>;
type ForgotPasswordDto = TypeOf<typeof forgotPasswordSchema>;
type ResetPasswordDto = TypeOf<typeof resetPasswordSchema>;

const userService = new UserService();
// export const registerUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const parsed = registerUserSchema.safeParse(req.body);
//     if (!parsed.success) {
//       res.status(400).json({ errors: parsed.error.flatten() });
//       return;
//     }

//     const user = await createUser(parsed.data);
//     res.status(201).json({
//       message: 'User registered',
//       user: { id: user.id, email: user.email }
//     });
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };


export const registerUser: RequestHandler = async (req: Request, res: Response) => {
  if (!validateParams(res, 'Validation failed', createUserSchema, req.body)) return;

  try {
    const user = await userService.register(req.body as CreateUserDto);

    const allowedFields = ['id', 'full_name', 'email', 'created_at', 'updated_at'];
    const serializedUser = GenericSerializer(user, allowedFields);

    sendResponse(req, res, { user: serializedUser }, 201, "User successfully registered");
  } catch (err: any) {
    sendResponse(req, res, { message: err.message }, 400);
  }
};

// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const parsed = loginSchema.safeParse(req.body);
//     if (!parsed.success) {
//       res.status(400).json({ errors: parsed.error.flatten() });
//       return;
//     }

//     const { email, password } = parsed.data;
//     const user = await authenticateUser(email, password);

//     if (user) {
//       res.status(200).json({
//         message: 'Login successful',
//         user: { id: user.id, email: user.email, firstName: user.firstName },
//         token: user.token,
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (err: any) {
//     res.status(500).json({ error: err.message });
//   }
// };

export const loginUser = async (req: Request, res: Response) => {
  if (!validateParams(res, 'Validation failed', loginUserSchema, req.body)) return;

  try {
    const user = await userService.login(req.body as LoginUserDto);
    const token = generateToken({ id: user.id, email: user.email });
    res.status(200).json({ token, user });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  if (!validateParams(res, 'Validation failed', forgotPasswordSchema, req.body)) return;

  try {
    const token = await userService.forgotPassword(req.body as ForgotPasswordDto);
    res.status(200).json({ message: 'Token generated', token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
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

export const resetPassword = async (req: Request, res: Response) => {
  if (!validateParams(res, 'Validation failed', resetPasswordSchema, req.body)) return;

  try {
    const user = await userService.resetPassword(req.body as ResetPasswordDto);
    res.status(200).json({ message: 'Password reset successful', user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};