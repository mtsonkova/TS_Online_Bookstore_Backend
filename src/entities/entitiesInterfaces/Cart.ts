import { Product } from "src/entities/entitiesInterfaces/Product";

export interface Cart {

	isEmpty():boolean;

	addProduct(productById: Product): void;

	getProducts(): Product[];

	clear(): void;
}

