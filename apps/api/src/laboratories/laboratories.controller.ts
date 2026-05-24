import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LaboratoriesService } from './laboratories.service';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Laboratories')
@Controller('laboratories')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LaboratoriesController {
  constructor(private laboratoriesService: LaboratoriesService) {}

  @Post()
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Create a new laboratory' })
  @ApiResponse({ status: 201, description: 'Laboratory created' })
  create(@Body() dto: CreateLaboratoryDto) {
    return this.laboratoriesService.create(dto);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'List all laboratories' })
  @ApiResponse({ status: 200, description: 'Array of laboratories' })
  findAll() {
    return this.laboratoriesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'Get laboratory by ID' })
  @ApiResponse({ status: 200, description: 'Laboratory details' })
  findOne(@Param('id') id: string) {
    return this.laboratoriesService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'Update laboratory' })
  @ApiResponse({ status: 200, description: 'Updated laboratory' })
  update(@Param('id') id: string, @Body() dto: UpdateLaboratoryDto) {
    return this.laboratoriesService.update(id, dto);
  }
}