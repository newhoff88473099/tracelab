import { Controller, Get, Post, Patch, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalysesService } from './analyses.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Analyses')
@Controller('analyses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalysesController {
  constructor(private analysesService: AnalysesService) {}

  @Post()
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'Create a new analysis' })
  @ApiResponse({ status: 201, description: 'Analysis created' })
  create(@Body() dto: CreateAnalysisDto, @Req() req) {
    return this.analysesService.create(dto, req.user.laboratoryId, req.user.sub);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst, UserRole.viewer)
  @ApiOperation({ summary: 'List all analyses' })
  @ApiResponse({ status: 200, description: 'Array of analyses' })
  findAll(@Req() req) {
    return this.analysesService.findAll(req.user.laboratoryId);
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst, UserRole.viewer)
  @ApiOperation({ summary: 'Get analysis by ID' })
  @ApiResponse({ status: 200, description: 'Analysis details' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.analysesService.findOne(id, req.user.laboratoryId);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'Update analysis' })
  @ApiResponse({ status: 200, description: 'Updated analysis' })
  update(@Param('id') id: string, @Body() dto: UpdateAnalysisDto, @Req() req) {
    return this.analysesService.update(id, dto, req.user.laboratoryId);
  }

  @Post(':id/validate')
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'Validate completed analysis' })
  @ApiResponse({ status: 200, description: 'Analysis validated' })
  validate(@Param('id') id: string, @Req() req) {
    return this.analysesService.validate(id, req.user.laboratoryId);
  }
}