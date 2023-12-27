import { AuthRequestEntityInterface } from "../../AuthRequest/front/AuthRequestEntity.interface";
import { SessionRawInterface } from "../SessionRaw.interface";

export interface SessionEntityInterface extends SessionRawInterface {
  authRequest?: AuthRequestEntityInterface
}