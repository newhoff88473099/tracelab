import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  create(@Body() dto: CreateProductDto, @Req() req) {
    return this.productsService.create(dto, req.user.laboratoryId);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({ status: 200, description: 'Array of products' })
  findAll(@Req() req) {
    return this.productsService.findAll(req.user.laboratoryId);
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product details' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.productsService.findOne(id, req.user.laboratoryId);
  }

  @Post('scan')
  @Roles(UserRole.admin, UserRole.lab_manager, UserRole.analyst)
  @ApiOperation({ summary: 'Lookup product by barcode/QR code' })
  @ApiResponse({ status: 200, description: 'Product or null if not found' })
  scan(@Body() body: { code: string }, @Req() req) {
    return this.productsService.findByCode(body.code, req.user.laboratoryId);
  }

  @Patch(':id')
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, description: 'Updated product' })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto, @Req() req) {
    return this.productsService.update(id, dto, req.user.laboratoryId);
  }

  @Delete(':id')
  @Roles(UserRole.admin, UserRole.lab_manager)
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 204, description: 'Product deleted' })
  async remove(@Param('id') id: string, @Req() req) {
    await this.productsService.remove(id, req.user.laboratoryId);
  }
}