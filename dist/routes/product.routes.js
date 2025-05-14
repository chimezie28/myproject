"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/product.routes.ts
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const multer_1 = __importDefault(require("multer"));
// Initialize multer middleware
const upload = (0, multer_1.default)({ dest: 'uploads/' }); // Directory for temporary files
const router = express_1.default.Router();
// POST /products - Handle media and create product
router.post('/products', upload.array('media', 10), product_controller_1.createProductHandler);
// GET /api/products
router.get('/', product_controller_1.getProductsHandler);
exports.default = router;
