import { UserEntity } from 'src/user/user.entity';
import { PromocodeRawInterface } from '../../../../shared/types/Promocode/PromocodeRaw.interface';

export interface PromocodeEntityInterface extends PromocodeRawInterface {
  owner: UserEntity;
}
