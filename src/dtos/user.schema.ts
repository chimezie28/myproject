
import { z } from 'zod';

// Password regex to ensure: uppercase, lowercase, number, and special character
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// CreateUserDto schema
export const createUserSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(strongPasswordRegex, {
      message:
        'must contain at least one upper case letter, one lower case letter, one digit and one special character',
    }),
});

// LoginUserDto schema
export const loginUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// ForgotPasswordDto schema
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// ResetPasswordDto schema
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(strongPasswordRegex, {
      message:
        'must contain at least one upper case letter, one lower case letter, one digit and one special character',
    }),
});
