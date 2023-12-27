import { UserRawInterface } from '../../../../shared/types/User/UserRaw.interface';
import { PromocodeEntity } from '../../promocode/promocode.entity';
import { SessionEntity } from '../user.entity';

export interface UserEntityInterface extends UserRawInterface {
  sessions: SessionEntity[];
  promocodes: PromocodeEntity[];
  ref_promocode: PromocodeEntity;
}
