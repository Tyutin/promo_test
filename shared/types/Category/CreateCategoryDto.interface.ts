export interface CreateCategoryDtoInterface {
  // @IsString()
  // @IsNotEmpty()
  title: string;

  // @IsInt()
  // @Min(1)
  // @IsOptional()
  cityId: number;

  published: boolean;
}
