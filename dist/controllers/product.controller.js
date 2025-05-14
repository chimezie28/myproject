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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsHandler = exports.createProductHandler = void 0;
const product_validator_1 = require("../validators/product.validator");
const product_service_1 = require("../services/product.service");
const uploadToBackblaze_1 = __importDefault(require("../utils/uploadToBackblaze"));
const createProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Parse and validate the request body
        const parsed = product_validator_1.productSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.flatten() });
            return;
        }
        const productData = parsed.data;
        // Extract userId from the JWT payload (set by authenticateToken middleware)
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: 'User not authenticated' });
            return;
        }
        // Upload media files to Backblaze
        const files = req.files;
        const mediaUrls = [];
        if (files && files.length > 0) {
            for (const file of files) {
                const url = yield (0, uploadToBackblaze_1.default)(file.path, file.originalname);
                mediaUrls.push(url);
            }
        }
        // const product = await createProduct({
        //   ...productData,
        //   userId: user.userId, // From JWT
        //   media: mediaUrls,
        // });
        const product = yield (0, product_service_1.createProduct)(Object.assign(Object.assign({}, productData), { userId: BigInt(user.userId), media: mediaUrls }));
        res.status(201).json({
            message: 'Product created successfully',
            product,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong while creating the product' });
    }
});
exports.createProductHandler = createProductHandler;
const getProductsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, product_service_1.getProductsService)(req.query);
        res.status(200).json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong while fetching products' });
    }
});
exports.getProductsHandler = getProductsHandler;
