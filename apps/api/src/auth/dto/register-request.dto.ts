import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsUUID, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'analyst@tracelab.app' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'P@ssword1' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsUUID()
  @IsNotEmpty()
  laboratoryId: string;

  @ApiProperty({ enum: UserRole, default: UserRole.viewer })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
