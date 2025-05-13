import { ZodSchema, ZodError } from 'zod';
import { Response } from 'express';

const formatZodErrors = (error: ZodError): Record<string, string> => {
  const formatted: Record<string, string> = {};

  for (const issue of error.errors) {
    const field = issue.path[0]?.toString() || 'unknown';
    formatted[field] = issue.message;
  }

  return formatted;
};

const editRequiredErrorMessage = (errors: Record<string, string>) => {
  for (const key in errors) {
    if (errors[key].toLowerCase().includes('required')) {
      errors[key] = 'is required';
    }
  }
};

const editInvalidPasswordMessage = (errors: Record<string, string>) => {
  if (errors.password?.startsWith('Invalid') || errors.password?.startsWith('String')) {
    errors.password =
      'must contain at least one upper case letter, one lower case letter, one digit and one special character';
  }
  if (errors.new_password?.startsWith('Invalid') || errors.new_password?.startsWith('String')) {
    errors.new_password =
      'must contain at least one upper case letter, one lower case letter, one digit and one special character';
  }
};

export const validateParams = (
  res: Response,
  errorMessage: string,
  schema: ZodSchema<any>,
  providedParams: any
): boolean => {
  try {
    schema.parse(providedParams);
    return true;
  } catch (err) {
    if (err instanceof ZodError) {
      const validationErrors = formatZodErrors(err);
      editRequiredErrorMessage(validationErrors);
      editInvalidPasswordMessage(validationErrors);

      res.status(400).json({
        message: errorMessage,
        errors: validationErrors,
      });

      return false;
    }

    res.status(500).json({ message: 'Validation failed unexpectedly.' });
    return false;
  }
};
