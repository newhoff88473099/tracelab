import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SamplesService } from './samples.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Samples')
@Controller('samples')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SamplesController {
  constructor(private samplesService: SamplesService) {}

  @Post()
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'Create a new sample' })
  @ApiResponse({ status: 201, description: 'Sample created' })
  create(@Body() dto: CreateSampleDto, @Req() req) {
    return this.samplesService.create(dto, req.user.laboratoryId);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst, UserRole.viewer)
  @ApiOperation({ summary: 'List all samples' })
  @ApiResponse({ status: 200, description: 'Array of samples' })
  findAll(@Req() req) {
    return this.samplesService.findAll(req.user.laboratoryId);
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst, UserRole.viewer)
  @ApiOperation({ summary: 'Get sample by ID' })
  @ApiResponse({ status: 200, description: 'Sample details' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.samplesService.findOne(id, req.user.laboratoryId);
  }

  @Post('scan')
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'Lookup sample by code' })
  @ApiResponse({ status: 200, description: 'Sample or null if not found' })
  scan(@Body() body: { code: string }, @Req() req) {
    return this.samplesService.findByCode(body.code, req.user.laboratoryId);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'Update sample' })
  @ApiResponse({ status: 200, description: 'Updated sample' })
  update(@Param('id') id: string, @Body() dto: UpdateSampleDto, @Req() req) {
    return this.samplesService.update(id, dto, req.user.laboratoryId);
  }

  @Post(':id/status')
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'Update sample status (workflow transition)' })
  @ApiResponse({ status: 200, description: 'Updated sample' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto, @Req() req) {
    return this.samplesService.updateStatus(id, dto.status, req.user.laboratoryId);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @ApiOperation({ summary: 'Delete sample' })
  @ApiResponse({ status: 204, description: 'Sample deleted' })
  async remove(@Param('id') id: string, @Req() req) {
    await this.samplesService.remove(id, req.user.laboratoryId);
  }
}