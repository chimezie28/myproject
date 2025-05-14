import { ProductInput } from '../validators/product.validator';
import Product from '../models/products';
import ProductMedia from '../models/product_media';
import Breed from '../models/animal_breeds'
import Species from '../models/animal_species'
import { paginate } from '../utils/paginate';
import { Op } from 'sequelize';
export const createProduct = async (
  input: ProductInput & { userId: bigint; media?: string[] } 
) => {
  try {
    // Create the product
    const product = await Product.create({
      title: input.title,
      price: input.price,
      description: input.description ?? '',
      discount: input.discount ?? 0,
      tax: input.tax ?? 0,
      stock: input.stock ?? 0,
      expiration_date: input.expirationDate ? new Date(input.expirationDate) : null,
      animal_name: input.animalName ?? '',
      animal_dob: input.animalDob ? new Date(input.animalDob) : null,
      animal_weight: input.animalWeight ?? 0,
      height: input.height ?? 0,
      health_condition: input.healthCondition ?? '',
      address: input.address ?? '',
      breed_id: Number(input.breedId), 
      species_id: Number(input.speciesId),
      user_id: Number(input.userId),
    });

    // Handle media associations if provided
    if (input.media && input.media.length > 0) {
      const mediaData = input.media.map((url) => ({
        product_id: product.id, // Associate with created product
        image_url: url,         // The image URL from the input
        date_created: new Date(), // Set the date_created to the current date
        last_date_modified: new Date(), // Set last modified date to current date
      }));

      // Insert the media into the database using bulkCreate
      const mediaItems = await ProductMedia.bulkCreate(mediaData);

      // Optionally, associate media items with the product
      // Using $set method to link the media items with the product
      await product.setMedia(mediaItems);
    }

    return product; // Return the created product
  } catch (error) {
    throw new Error('Error creating product: ');
  }
};

export const getProductsService = async (query: any) => {
    const { search } = query;
    const { offset, limit, page, pageSize } = paginate(query);
  
    const whereCondition: any = {};
  
    let includeConditions: any[] = [
      { model: ProductMedia, as: 'media' },
      { model: Breed, as: 'breed' },
      { model: Species, as: 'species' },
    ];
  
    if (typeof search === 'string' && search.trim()) {
      const searchLower = search.toLowerCase();
  
      includeConditions = [
        {
          model: Breed,
          as: 'breed',
          where: {
            name: {
              [Op.iLike]: `%${searchLower}%`,
            },
          },
          required: false,
        },
        {
          model: Species,
          as: 'species',
          where: {
            name: {
              [Op.iLike]: `%${searchLower}%`,
            },
          },
          required: false,
        },
        {
          model: ProductMedia,
          as: 'media',
        },
      ];
    }
  
    const { count, rows: products } = await Product.findAndCountAll({
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
  };
