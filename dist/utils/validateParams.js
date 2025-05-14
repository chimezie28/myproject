"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = void 0;
const zod_1 = require("zod");
const formatZodErrors = (error) => {
    var _a;
    const formatted = {};
    for (const issue of error.errors) {
        const field = ((_a = issue.path[0]) === null || _a === void 0 ? void 0 : _a.toString()) || 'unknown';
        formatted[field] = issue.message;
    }
    return formatted;
};
const editRequiredErrorMessage = (errors) => {
    for (const key in errors) {
        if (errors[key].toLowerCase().includes('required')) {
            errors[key] = 'is required';
        }
    }
};
const editInvalidPasswordMessage = (errors) => {
    var _a, _b, _c, _d;
    if (((_a = errors.password) === null || _a === void 0 ? void 0 : _a.startsWith('Invalid')) || ((_b = errors.password) === null || _b === void 0 ? void 0 : _b.startsWith('String'))) {
        errors.password =
            'must contain at least one upper case letter, one lower case letter, one digit and one special character';
    }
    if (((_c = errors.new_password) === null || _c === void 0 ? void 0 : _c.startsWith('Invalid')) || ((_d = errors.new_password) === null || _d === void 0 ? void 0 : _d.startsWith('String'))) {
        errors.new_password =
            'must contain at least one upper case letter, one lower case letter, one digit and one special character';
    }
};
const validateParams = (res, errorMessage, schema, providedParams) => {
    try {
        schema.parse(providedParams);
        return true;
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
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
exports.validateParams = validateParams;
