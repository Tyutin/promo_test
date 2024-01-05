import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { UpdateOrderDtoInterface } from '../../../../shared/types/Order/UpdateOrder.dto';
import { OrderStatus } from '@shared/types/Order/orderStatus';

export class UpdateOrderDto implements UpdateOrderDtoInterface {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsOptional()
  @IsString()
  deliveryAddress: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  productPrice: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  shippingPrice: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  serviceCommission: number;

  @IsOptional()
  @IsString()
  clientNotes: string;

  @IsOptional()
  @IsString()
  serviceNotes: string;

  @IsOptional()
  @IsBoolean()
  isPaidByClient: boolean;

  @IsOptional()
  @IsDate()
  estimatedDeliveryTime: Date;

  @IsOptional()
  @IsString()
  cancelReason: string;

  @IsOptional()
  @IsString()
  currentLocation?: string;
}
