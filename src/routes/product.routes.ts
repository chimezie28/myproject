// // routes/product.routes.ts
// import express from 'express';
// // import { createProductHandler } from '../controllers/product.controller';
// import { authenticateToken } from '../middleware/auth.middleware';
// import multer from 'multer';

// // Initialize multer middleware
// const upload = multer({ dest: 'uploads/' }); // Directory for temporary files

// const router = express.Router();

// // POST /products - Handle media and create product
// router.post('/products', upload.array('media', 10), createProductHandler);

// export default router;
