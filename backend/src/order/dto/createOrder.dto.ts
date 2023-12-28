import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsOptional,
  IsBoolean,
  IsDate,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  deliveryAddress: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  productPrice: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  shippingPrice: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  serviceCommission: number;

  @IsOptional()
  @IsString()
  clientNotes?: string;

  @IsOptional()
  @IsString()
  serviceNotes?: string;

  @IsOptional()
  @IsBoolean()
  isPaidByClient?: boolean;

  @IsOptional()
  @IsDate()
  estimatedDeliveryTime?: Date;
}
