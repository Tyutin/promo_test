import { SessionRawInterface } from '../../../../shared/types/Session/SessionRaw.interface';
import { AuthRequestEntity, UserEntity } from '../user.entity';

export interface SessionEntityInterface extends SessionRawInterface {
  user: UserEntity;
  authRequest: AuthRequestEntity;
}
