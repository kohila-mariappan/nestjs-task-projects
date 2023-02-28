import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  id: number;
  name: string;

  slug: string;

  banner: string;
}
