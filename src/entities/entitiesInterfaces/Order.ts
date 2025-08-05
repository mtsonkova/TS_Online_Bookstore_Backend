import { Product } from "src/entities/entitiesInterfaces/Product";

export interface Order {

	isCreditCardNumberValid(userInput: string): boolean;

	setCreditCardNumber(userInput: string): void;

	setProducts(products: Product[]): void;
 
    setCustomerId(customerId: number): void;
	
	getCustomerId(): number;

}
