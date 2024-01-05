import { UserEntityInterface } from "../../User/front/UserEntity.interface";
import { OrderRawInterface } from "../OrderRaw.interface";

export interface OrderEntityInterface extends OrderRawInterface {
  user: UserEntityInterface
  createdBy: UserEntityInterface
}