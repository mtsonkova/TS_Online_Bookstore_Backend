import { Product } from "@src/entities/entitiesInterfaces/Product";
import { DefaultProduct } from "@src/entities/impl/DefaultProduct";
import { ProductManagementService } from "@src/services/ProductManagementService";
import { ProductStoringService } from "@src/storage/ProductStoringService";
import { DefaultProductStoringService } from "@src/storage/impl/DefaultProductStoringService";

export class DefaultProductManagementService implements ProductManagementService {
  private static instance: DefaultProductManagementService;
  private static products: Product[] = [];
  private static productStoringService: ProductStoringService = new DefaultProductStoringService();

  // Simulate static block
  private static initialized: boolean = DefaultProductManagementService.initialize();

  private static initialize(): boolean {
    DefaultProductManagementService.loadProductsFromStorage();
    return true;
  }

  public static loadProductsFromStorage(): void {
    this.products = this.productStoringService.loadProducts();
  }

  /**
   * @deprecated use loadProductsFromStorage instead
   */
  private static initProducts(): void {
    this.products = [
      new DefaultProduct(1, "Hardwood Oak Suffolk Internal Door", "Doors", 109.99),
      new DefaultProduct(2, "Oregon Cottage Interior Oak Door", "Doors", 179.99),
      new DefaultProduct(3, "Oregon Cottage Horizontal Interior White Oak Door", "Doors", 189.99),
      new DefaultProduct(4, "4 Panel Oak Deco Interior Door", "Doors", 209.09),
      new DefaultProduct(5, "Worcester 2000 30kW Ng Combi Boiler Includes Free Comfort+ II controller", "Boilers", 989.99),
      new DefaultProduct(6, "Glow-worm Betacom 4 30kW Combi Gas Boiler ERP", "Boilers", 787.99),
      new DefaultProduct(7, "Worcester 2000 25kW Ng Combi Boiler with Free Comfort+ II controller", "Boilers", 859.99),
      new DefaultProduct(8, "Wienerberger Terca Class B Engineering Brick Red 215mm x 102.5mm x 65mm (Pack of 504)", "Bricks", 402.99),
      new DefaultProduct(9, "Wienerberger Terca Engineering Brick Blue Perforated Class B 65mm (Pack of 400)", "Bricks", 659.99),
      new DefaultProduct(10, "Wienerberger Engineering Brick Red Smooth Class B 73mm - Pack of 368", "Bricks", 523.99)
    ];
  }

  private constructor() {}

  public static getInstance(): ProductManagementService {
    if (!this.instance) {
      this.instance = new DefaultProductManagementService();
    }
    return this.instance;
  }

  public getProducts(): Product[]  {
    return DefaultProductManagementService.products;
  }

  public getProductById(productIdToAddToCart: number): Product | null {
    for (const product of DefaultProductManagementService.products) {
      if (product && product.getId() === productIdToAddToCart) {
        return product;
      }
    }
    return null;
  }
}
