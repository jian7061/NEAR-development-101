import { Product, listedProducts } from "./model";
import { ContractPromiseBatch, context } from "near-sdk-as";

//WRITE FUNCTION: function to add a new product to the products map.
export function setProduct(product: Product): void {
  let storedProduct = listedProducts.get(product.id);
  if (storedProduct !== null) {
    throw new Error(`s product with ${product.id} already exists`);
  }
  listedProducts.set(product.id, Product.fromPayload(product));
}

//READ FUNCTION: function to retrieve a product name from the products map.
export function getProduct(id: string): Product | null {
  return listedProducts.get(id);
}

export function getProducts(): Product[] {
  return listedProducts.values();
}

export function buyProduct(productId: string): void {
  const product = getProduct(productId);
  if (product == null) {
    throw new Error("product not found");
  }
  if (product.price.toString() != context.attachedDeposit.toString()) {
    throw new Error(
      "attached deposit should equal to the price of the product."
    );
  }
  ContractPromiseBatch.create(product.owner).transfer(context.attachedDeposit);
  product.imcrementSoldAmount();
  listedProducts.set(product.id, product);
}

