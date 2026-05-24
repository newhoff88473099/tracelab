import { Controller, Get, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'List all users in laboratory' })
  @ApiResponse({ status: 200, description: 'Array of users' })
  findAll(@Req() req) {
    return this.usersService.findAll(req.user.laboratoryId);
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User details' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.usersService.findOne(id, req.user.laboratoryId);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'Updated user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto, @Req() req) {
    return this.usersService.update(id, dto, req.user.laboratoryId);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string, @Req() req) {
    await this.usersService.remove(id, req.user.laboratoryId);
  }
}