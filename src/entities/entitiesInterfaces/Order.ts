//todo

// package com.itbulls.learnit.javacore.exam.solution.enteties;

// import java.io.Serializable;
// public interface Order extends Serializable {
import { Product } from "@src/entities/entitiesInterfaces/Product";
interface Order {

	isCreditCardNumberValid(userInput: string): boolean;

	setCreditCardNumber(userInput: string): void;

	setProducts(products: Product[]): void;
 
    setCustomerId(customerId: Number): void;
	
	getCustomerId(): Number;

}
