import {Order} from '@src/entities/entitiesInterfaces/Order';
import {Product} from '@src/entities/entitiesInterfaces/Product';

export class DefaultOrder implements Order {

	private readonly AMOUNT_OF_DIGITS_IN_CREDIT_CARD_NUMBER = 16;
	private creditCardNumber!: string
	private products!: Product[];
	private customerId!: number;

	public isCreditCardNumberValid(creditCardNumber: string): boolean {
    return creditCardNumber.length === this.AMOUNT_OF_DIGITS_IN_CREDIT_CARD_NUMBER &&
           !creditCardNumber.includes(" ") &&
           Number(creditCardNumber) > 0;
}

	public setCreditCardNumber(creditCardNumber: string):void {
		if (creditCardNumber == null) {
			return;
		}
		this.creditCardNumber = creditCardNumber;
	}

	
	public setProducts( products: Product[]): void {
		this.products = [...products];
	}

	public setCustomerId(customerId: number): void {
		this.customerId = customerId;
	}


	public getCustomerId(): number {
		return this.customerId;
	}
	
	public toString(): string {
		return "Order: customer id - " + this.customerId + "\t" +
					"credit card number - " + this.creditCardNumber + "\t" + 
					"products - " + this.products;
	}
}
