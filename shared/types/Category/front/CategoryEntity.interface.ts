import { ProductRawInterface } from "../../Product/ProductRaw.interface";
import { CategoryRawInterface } from "../CategoryRaw.interface";

export interface CategoryEntityInterface extends CategoryRawInterface {
  products: ProductRawInterface[]
}