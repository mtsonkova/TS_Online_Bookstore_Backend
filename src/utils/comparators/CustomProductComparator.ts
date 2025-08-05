// src/utils/comparators/CustomProductComparator.ts
import { Product } from "src/entities/entitiesInterfaces/Product";

export class CustomProductComparator {
  compare(product1: Product, product2: Product): number {
    let result = product1.getCategoryName().localeCompare(product2.getCategoryName());

    if (result === 0) {
      const priceDelta = product1.getPrice() - product2.getPrice();
      result = priceDelta < 0 ? -1 : priceDelta === 0 ? 0 : 1;
    }

    if (result === 0) {
      result = product1.getProductName().localeCompare(product2.getProductName());
    }

    return result;
  }
}
