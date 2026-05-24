import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SampleStatus } from '@prisma/client';

export class UpdateStatusDto {
  @ApiProperty({ enum: SampleStatus })
  @IsNotEmpty()
  status: SampleStatus;
}