export interface UpdateCategoryDtoInterface {
  // @IsInt()
  // @IsNotEmpty()
  id: number;

  // @IsString()
  // @IsNotEmpty()
  title: string;
  
  published: boolean;
}
