import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Produto XYZ' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'PRD-001', required: false })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({ example: '7891234567890', required: false })
  @IsOptional()
  @IsString()
  barcode?: string;

  @ApiProperty({ example: 'Alimentos', required: false })
  @IsOptional()
  @IsString()
  category?: string;
}