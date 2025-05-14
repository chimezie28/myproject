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
exports.getProductsService = exports.createProduct = void 0;
const products_1 = __importDefault(require("../models/products"));
const product_media_1 = __importDefault(require("../models/product_media"));
const animal_breeds_1 = __importDefault(require("../models/animal_breeds"));
const animal_species_1 = __importDefault(require("../models/animal_species"));
const paginate_1 = require("../utils/paginate");
const sequelize_1 = require("sequelize");
const createProduct = (input // Changed from number to bigint
) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        // Create the product
        const product = yield products_1.default.create({
            title: input.title,
            price: input.price,
            description: (_a = input.description) !== null && _a !== void 0 ? _a : '',
            discount: (_b = input.discount) !== null && _b !== void 0 ? _b : 0,
            tax: (_c = input.tax) !== null && _c !== void 0 ? _c : 0,
            stock: (_d = input.stock) !== null && _d !== void 0 ? _d : 0,
            expiration_date: input.expirationDate ? new Date(input.expirationDate) : null,
            animal_name: (_e = input.animalName) !== null && _e !== void 0 ? _e : '',
            animal_dob: input.animalDob ? new Date(input.animalDob) : null,
            animal_weight: (_f = input.animalWeight) !== null && _f !== void 0 ? _f : 0,
            height: (_g = input.height) !== null && _g !== void 0 ? _g : 0,
            health_condition: (_h = input.healthCondition) !== null && _h !== void 0 ? _h : '',
            address: (_j = input.address) !== null && _j !== void 0 ? _j : '',
            breed_id: Number(input.breedId),
            species_id: Number(input.speciesId),
            user_id: Number(input.userId),
        });
        // Handle media associations if provided
        if (input.media && input.media.length > 0) {
            const mediaData = input.media.map((url) => ({
                product_id: product.id, // Associate with created product
                image_url: url, // The image URL from the input
                date_created: new Date(), // Set the date_created to the current date
                last_date_modified: new Date(), // Set last modified date to current date
            }));
            // Insert the media into the database using bulkCreate
            const mediaItems = yield product_media_1.default.bulkCreate(mediaData);
            // Optionally, associate media items with the product
            // Using $set method to link the media items with the product
            yield product.setMedia(mediaItems);
        }
        return product; // Return the created product
    }
    catch (error) {
        throw new Error('Error creating product: ');
    }
});
exports.createProduct = createProduct;
const getProductsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = query;
    const { offset, limit, page, pageSize } = (0, paginate_1.paginate)(query);
    const whereCondition = {};
    let includeConditions = [
        { model: product_media_1.default, as: 'media' },
        { model: animal_breeds_1.default, as: 'breed' },
        { model: animal_species_1.default, as: 'species' },
    ];
    if (typeof search === 'string' && search.trim()) {
        const searchLower = search.toLowerCase();
        includeConditions = [
            {
                model: animal_breeds_1.default,
                as: 'breed',
                where: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${searchLower}%`,
                    },
                },
                required: false,
            },
            {
                model: animal_species_1.default,
                as: 'species',
                where: {
                    name: {
                        [sequelize_1.Op.iLike]: `%${searchLower}%`,
                    },
                },
                required: false,
            },
            {
                model: product_media_1.default,
                as: 'media',
            },
        ];
    }
    const { count, rows: products } = yield products_1.default.findAndCountAll({
        where: whereCondition,
        include: includeConditions,
        offset,
        limit,
        order: [['created_at', 'DESC']],
    });
    return {
        message: 'Products fetched successfully',
        data: products,
        pagination: {
            total: count,
            page,
            limit: pageSize,
            totalPages: Math.ceil(count / pageSize),
        },
    };
});
exports.getProductsService = getProductsService;
