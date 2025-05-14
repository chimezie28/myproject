"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
// src/schemas/product.schema.ts
const zod_1 = require("zod");
exports.productSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    price: zod_1.z.number().min(0, 'Price should be greater than 0'),
    description: zod_1.z.string().optional(),
    discount: zod_1.z.number().min(0, 'Discount cannot be less than 0').max(100, 'Discount cannot exceed 100').optional(),
    tax: zod_1.z.number().min(0, 'Tax cannot be negative').max(100, 'Tax cannot exceed 100').optional(),
    stock: zod_1.z.number().int().min(0, 'Stock must be a non-negative integer').optional(),
    expirationDate: zod_1.z.date().optional(),
    animalName: zod_1.z.string().min(1, 'Animal name is required').optional(),
    animalDob: zod_1.z.date().optional(),
    animalWeight: zod_1.z.number().min(0, 'Animal weight must be positive').optional(),
    height: zod_1.z.number().min(0, 'Height must be positive').optional(),
    healthCondition: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    media: zod_1.z.array(zod_1.z.string()).optional(),
    // Foreign Keys
    userId: zod_1.z.bigint(),
    breedId: zod_1.z.bigint().optional(),
    speciesId: zod_1.z.bigint().optional(),
});
