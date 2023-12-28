import { UserEntityInterface } from "@shared/types/User/front/UserEntity.interface";
import { OrderRawInterface } from "../OrderRaw.interface";
import { OrderStatus } from "../orderStatus";

export interface OrderEntityInterface extends OrderRawInterface {
  user: UserEntityInterface
  createdBy: UserEntityInterface
  status: OrderStatus
}