import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Clients')
@Controller('clients')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Post()
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'Client created' })
  create(@Body() dto: CreateClientDto, @Req() req) {
    return this.clientsService.create(dto, req.user.laboratoryId);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'List all clients' })
  @ApiResponse({ status: 200, description: 'Array of clients' })
  findAll(@Req() req) {
    return this.clientsService.findAll(req.user.laboratoryId);
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'Get client by ID' })
  @ApiResponse({ status: 200, description: 'Client details' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.clientsService.findOne(id, req.user.laboratoryId);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'Update client' })
  @ApiResponse({ status: 200, description: 'Updated client' })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto, @Req() req) {
    return this.clientsService.update(id, dto, req.user.laboratoryId);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Delete client' })
  @ApiResponse({ status: 204, description: 'Client deleted' })
  async remove(@Param('id') id: string, @Req() req) {
    await this.clientsService.remove(id, req.user.laboratoryId);
  }
}