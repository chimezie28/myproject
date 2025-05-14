import User from '../models/users';
import { createUserSchema, loginUserSchema, forgotPasswordSchema, resetPasswordSchema } from '../dtos/user.schema';
import { hashPassword, comparePasswords } from '../utils/password.utils';
import { generateToken, getSessionIdFromToken } from '../utils/jwt.util';
import crypto from 'crypto';
import { TypeOf } from 'zod';
import  ApiError  from '../utils/api_error';
// const JWT_SECRET = process.env.JWT_SECRET;  // Make sure this is in your .env file!
import nodemailer from 'nodemailer';

// if (!JWT_SECRET) {
//   throw new Error('JWT_SECRET environment variable is not set');
// }
type CreateUserDto = TypeOf<typeof createUserSchema>;
type LoginUserDto = TypeOf<typeof loginUserSchema>;
type ForgotPasswordDto = TypeOf<typeof forgotPasswordSchema>;
type ResetPasswordDto = TypeOf<typeof resetPasswordSchema>;

export class UserService {
    async register(userDto: CreateUserDto, req?: Request) {
        // Step 1: Normalize and clean data
        const email = userDto.email.trim().toLowerCase();
        const full_name = userDto.full_name;
    
        // Step 2: Check for duplicate email
        const existing = await User.findOne({ where: { email } });
        if (existing) {
          throw new ApiError('This email has been used to create an existing account', 409);
        }
    
        // Step 3: Encrypt password
        const password = await hashPassword(userDto.password);  
        // Step 5: Create user
        const user = await User.create({
          full_name,
          email,
          password
        });
    
        // Step 6: Generate session token and update user session ID
        const token = generateToken({ id: user.id, email: user.email });
        const session_id = getSessionIdFromToken(token);
        await user.update({ unique_session_id: session_id });
        // await sendConfirmationEmail(user);
    
        // Step 8: Return serialized user and token
        return {
          user, // or `UserSerializer.serialize(user)` if you have a serializer
          token,
        };
      }

  async login({ email, password }: LoginUserDto) {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    const token = crypto.randomBytes(20).toString('hex');
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found');
    user.reset_password_token = token;
    const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'petertechy01@gmail.com',
            pass: 'cwko ojme cgys qzqo',
          },
        });
    
        const resetLink = `https://insemigen-marketplace-backend-9.onrender.com/${token}`;
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Password Reset',
          text: `Click the link to reset your password: ${resetLink}`,
        });
    
    return token;
  }

  async resetPassword({ token, newPassword }: ResetPasswordDto) {
    const user = await User.findOne({ where: { reset_password_token: token } });
    if (!user) throw new Error('Invalid token');
    user.password = await hashPassword(newPassword);
    // user.reset_password_token = null;
    await user.save();
    return user;
  }
}
