import { Product } from "@src/entities/entitiesInterfaces/Product";

export interface ProductManagementService {

	getProducts(): Product[];

	getProductById(productIdToAddToCart: number): Product | null;

}
