import fs from "fs";
import path from "path";

import { Product } from "src/entities/entitiesInterfaces/Product";
import { DefaultProduct } from "src/entities/impl/DefaultProduct";
import { ProductStoringService } from "src/storage/ProductStoringService";

export class DefaultProductStoringService implements ProductStoringService {
  private static readonly PRODUCTS_INFO_STORAGE = "products.csv";
  private static readonly CURRENT_TASK_RESOURCE_FOLDER = "finaltask";
  private static readonly RESOURCES_FOLDER = "resources";
  private static readonly PRODUCT_PRICE_INDEX = 3;
  private static readonly PRODUCT_CATEGORY_INDEX = 2;
  private static readonly PRODUCT_NAME_INDEX = 1;
  private static readonly PRODUCT_ID_INDEX = 0;

  public loadProducts(): Product[] {
    const filePath = path.join(
      DefaultProductStoringService.RESOURCES_FOLDER,
      DefaultProductStoringService.CURRENT_TASK_RESOURCE_FOLDER,
      DefaultProductStoringService.PRODUCTS_INFO_STORAGE
    );

    try {
      const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
      const lines = fileContent.split("\n");

      return lines
        .filter(line => line.trim().length > 0)
        .map(line => {
          const productElements = line.split(",");
          return new DefaultProduct(
            Number(productElements[DefaultProductStoringService.PRODUCT_ID_INDEX]),
            productElements[DefaultProductStoringService.PRODUCT_NAME_INDEX],
            productElements[DefaultProductStoringService.PRODUCT_CATEGORY_INDEX],
            parseFloat(productElements[DefaultProductStoringService.PRODUCT_PRICE_INDEX])
          );
        });
    } catch (err) {
      console.error("Failed to load products:", err);
      return [];
    }
  }
}
