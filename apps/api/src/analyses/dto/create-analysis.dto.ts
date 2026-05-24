import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateAnalysisDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  sampleId: string;

  @ApiProperty({ example: 'Microbiological' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  result?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}