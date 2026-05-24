import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLaboratoryDto {
  @ApiProperty({ example: 'Lab Controle Qualidade' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '12.345.678/0001-90', required: false })
  @IsOptional()
  @IsString()
  cnpj?: string;
}