import { IsOptional, IsString } from 'class-validator';
import { UpdateMyOrderDtoInterface } from '../../../../shared/types/Order/UpdateMyOrder.dto';

export class UpdateMyOrderDto implements UpdateMyOrderDtoInterface {
  @IsOptional()
  @IsString()
  name: string;
}
