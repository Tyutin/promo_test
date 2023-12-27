import { PromocodeEntityInterface } from "../../Promocode/front/PromocodeEntity.interface";
import { SessionEntityInterface } from "../../Session/front/SessionEntity.interface";
import { UserRawInterface } from "../UserRaw.interface";


export interface UserEntityInterface extends UserRawInterface {
  sessions?: SessionEntityInterface[]
  promocodes?: PromocodeEntityInterface[]
  ref_promocode?: PromocodeEntityInterface
}