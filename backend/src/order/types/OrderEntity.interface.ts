import { UserEntity } from '../../user/user.entity';
import { OrderRawInterface } from '../../../../shared/types/Order/OrderRaw.interface';

export interface OrderEntityInterface extends OrderRawInterface {
  user: UserEntity;
  createdBy: UserEntity;
}
