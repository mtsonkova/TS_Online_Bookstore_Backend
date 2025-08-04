import { Product } from "src/entities/entitiesInterfaces/Product";

export interface ProductStoringService {
	loadProducts(): Product[];

}
