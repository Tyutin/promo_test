import { CategoryEntityInterface } from "../../Category/front/CategoryEntity.interface";
import { ProductEntityInterface } from "../../Product/front/ProductEntity.interface";
import { CityRawInterface } from "../CityRaw.interface";

export interface CityEntityInterface extends CityRawInterface {
  categories: CategoryEntityInterface[];
  products: ProductEntityInterface[];
}