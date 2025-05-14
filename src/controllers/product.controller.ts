// src/controllers/product.controller.ts
import { Request, Response } from 'express';
import { productSchema, ProductInput } from '../validators/product.validator';
import { createProduct, getProductsService } from '../services/product.service';
import uploadToBackblaze from '../utils/uploadToBackblaze';

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse and validate the request body
    const parsed = productSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten() });
      return;
    }

    const productData: ProductInput = parsed.data;

    // Extract userId from the JWT payload (set by authenticateToken middleware)
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    // Upload media files to Backblaze
    const files = req.files as Express.Multer.File[];
    const mediaUrls: string[] = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const url = await uploadToBackblaze(file.path, file.originalname);
        mediaUrls.push(url);
      }
    }

    // const product = await createProduct({
    //   ...productData,
    //   userId: user.userId, // From JWT
    //   media: mediaUrls,
    // });
    const product = await createProduct({
        ...productData,
        userId: BigInt(user.userId),
        media: mediaUrls,
      });
      

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong while creating the product' });
  }
};

export const getProductsHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await getProductsService(req.query);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong while fetching products' });
    }
  };


