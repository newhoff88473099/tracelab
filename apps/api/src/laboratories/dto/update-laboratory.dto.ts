import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLaboratoryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  address?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  contact?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  settings?: any;
}