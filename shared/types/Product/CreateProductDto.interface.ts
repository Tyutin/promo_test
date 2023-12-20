export interface CreateProductDtoInterface {
  // @IsString()
  // @IsNotEmpty()
  title: string;

  // @IsInt()
  // @IsNotEmpty()
  // @Min(0)
  // @Max(1000000)
  price: number;

  // @IsString()
  // @IsOptional()
  image?: string;

  // @IsString()
  // @IsNotEmpty()
  description: string;

  // @IsInt()
  // @IsNotEmpty()
  // @Min(1)
  // @Max(100000)
  weight: number;

  // @IsBoolean()
  published: boolean;

  // @IsInt()
  // @Min(1)
  // @IsNotEmpty()
  categoryId: number;
}
