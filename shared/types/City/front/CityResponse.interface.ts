import { CityEntityInterface } from "./CityEntity.interface";

export interface CityResponseInterface {
  city: CityEntityInterface;
  isAdminOrSecret: boolean;
}