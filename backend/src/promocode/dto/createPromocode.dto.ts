import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePromocodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  commission?: number;
}
