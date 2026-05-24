import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSampleDto {
  @ApiProperty({ example: 'SMP-2024-0001' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000', required: false })
  @IsOptional()
  @IsUUID()
  productId?: string;
}