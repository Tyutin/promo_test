import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSelfPromocodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
