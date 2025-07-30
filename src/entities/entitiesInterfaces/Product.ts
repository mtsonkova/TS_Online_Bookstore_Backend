//todo

// package com.itbulls.learnit.javacore.exam.solution.enteties;

// import java.io.Serializable;
// expect issues wit this class because you do not have Serializable interface in TS
//export interface Product extends Serializable {

export interface Product {
    getId(): number;
	
    getProductName(): string;
	
	getCategoryName(): string;
	
	getPrice(): number;

	setPrice(price: number): void;
}
