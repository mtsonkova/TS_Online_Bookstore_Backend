import { Product } from "./entities/entitiesInterfaces/Product";

export interface ProductStoringService {
	loadProducts(): Product[];

}
