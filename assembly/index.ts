import { PersistentUnorderedMap } from "near-sdk-as";

//map product ids of type string to product names of type string.
export const products = new PersistentUnorderedMap<string, string>("PRODUCTS");
//key for the persistent collenction should be short.

//WRITE FUNCTION: function to add a new product to the products map.
export function setProduct(id: string, productName: string): void {
  products.set(id, productName);
}

//READ FUNCTION: function to retrieve a product name from the products map.
export function getProduct(id: string): string | null {
  return products.get(id);
}
