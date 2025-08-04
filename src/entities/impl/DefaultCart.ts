import { Cart } from './entities/entitiesInterfaces/Cart';
import { Product } from './entities/entitiesInterfaces/Product';

export class DefaultCart implements Cart {

	private products: Product[];
	
	constructor(){
		this.products = [];
	}
	
	public isEmpty(): boolean {
		return (this.products.length === 0);
	}

	public addProduct(product: Product): void {
		if (product == null) {
			return;
		}
		this.products.push(product);
	}

	public getProducts():Product[] {
    	return this.products;
	}

	public clear(): void {
		this.products = [];
	}

}
