// import prisma from '../config/prisma';
// import { ProductInput } from '../validators/product.validator';

// export const createProduct = async (
//   input: ProductInput & { userId: bigint; media?: string[] } // <- CHANGED number to bigint
// ) => {
//   return prisma.product.create({
//     data: {
//       title: input.title,
//       price: input.price,
//       description: input.description,
//       discount: input.discount,
//       tax: input.tax,
//       stock: input.stock,
//       expirationDate: input.expirationDate ? new Date(input.expirationDate) : undefined,
//       animalName: input.animalName,
//       animalDob: input.animalDob ? new Date(input.animalDob) : undefined,
//       animalWeight: input.animalWeight,
//       height: input.height,
//       healthCondition: input.healthCondition,
//       address: input.address,
//       breedId: input.breedId,
//       speciesId: input.speciesId,
//       userId: input.userId, // now bigint
//       media: input.media?.map((url) => ({
//         imageUrl: url,
//         dateCreated: new Date(),
//         lastDateModified: new Date(),
//       })),
//     },
//     include: {
//       media: true,
//     },
//   });
// };
