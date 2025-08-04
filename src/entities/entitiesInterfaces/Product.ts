export interface Product {
    getId(): number;
	
    getProductName(): string;
	
	getCategoryName(): string;
	
	getPrice(): number;

	setPrice(price: number): void;
}
