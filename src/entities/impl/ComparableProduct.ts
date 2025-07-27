import { Product } from "@src/entities/entitiesInterfaces/Product";
// exect issues here because we do not have default Comparable interface in TS
// public class ComparableProduct implements Product, Comparable<Product> {

export class ComparableProduct implements Product {
	
	private id: number;
	private productName: string;
	private categoryName: string;
	private price: number;
    
    constructor();
    constructor(id: number, productName: string, categoryName: string, price: number);
    constructor(id?: number, productName?: string, categoryName?: string, price?: number) {
  this.id = id ?? 0;
  this.productName = productName ?? "";
  this.categoryName = categoryName ?? "";
  this.price = price ?? 0;
}


	
	public toString(): string {
		return "Product id=" + this.id + ", product name=" + this.productName
				+ ", category name=" + this.categoryName + ", price=" + this.price;
	}

	public getId(): number {
		return this.id;
	}

	public getProductName(): string {
		return this.productName;
	}
	
	public getCategoryName(): string {
		return this.categoryName;
	}

	public getPrice(): number {
		return this.price;
	}
	
	public setPrice(price: number): void {
		this.price = price;
	}
	
	public compareTo(otherProduct: Product): number {
		return this.id - otherProduct.getId();
	}

}
