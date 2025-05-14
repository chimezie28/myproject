
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
export const registerUser: RequestHandler = async (req: Request, res: Response) => {
  if (!validateParams(res, 'Validation failed', createUserSchema, req.body)) return;

  try {
    const result = await userService.register(req.body as CreateUserDto);

    // Extract user and token from the returned result
    const userInstance = result.user;
    const token = result.token;

    const allowedFields = ['id', 'full_name', 'email', 'created_at', 'updated_at'];
    const userData = userInstance.get(); // Raw data from Sequelize instance
    const serializedUser = GenericSerializer(userData, allowedFields);

    if (typeof serializedUser.id === 'string') {
      serializedUser.id = Number(serializedUser.id);
    }

    // Include the token in the response
    sendResponse(req, res, { user: serializedUser, token }, 200, "User successfully registered");
  } catch (err: any) {
    sendResponse(req, res, { message: err.message }, 400);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  if (!validateParams(res, 'Validation failed', loginUserSchema, req.body)) return;

  try {
    const user = await userService.login(req.body as LoginUserDto);

    const allowedFields = ['id', 'full_name', 'email', 'created_at', 'updated_at'];
    const userData = user.get(); // Raw data from Sequelize instance
    const serializedUser = GenericSerializer(userData, allowedFields);

    // Ensure ID is a number
    if (typeof serializedUser.id === 'string') {
      serializedUser.id = Number(serializedUser.id);
    }

    const token = generateToken({ id: serializedUser.id, email: serializedUser.email });

    // ✅ Send response using your custom utility
    sendResponse(req, res, { token, user: serializedUser }, 200, "User successfully logged in");
  } catch (err: any) {
    sendResponse(req, res, { message: err.message }, 401);
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


export const resetPassword = async (req: Request, res: Response) => {
  if (!validateParams(res, 'Validation failed', resetPasswordSchema, req.body)) return;

  try {
    const user = await userService.resetPassword(req.body as ResetPasswordDto);
    res.status(200).json({ message: 'Password reset successful', user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};