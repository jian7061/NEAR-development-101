import { Product, listedProducts } from "./model";

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
