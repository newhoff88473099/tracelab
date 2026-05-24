import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto, laboratoryId: string) {
    return this.prisma.product.create({
      data: { ...dto, laboratoryId },
    });
  }

  async findAll(laboratoryId: string) {
    return this.prisma.product.findMany({
      where: { laboratoryId },
      select: {
        id: true,
        name: true,
        sku: true,
        barcode: true,
        category: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string, laboratoryId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product || product.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findByCode(code: string, laboratoryId: string): Promise<{ id: string; name: string; laboratoryId: string; barcode?: string; qrcode?: string } | null> {
    return this.prisma.product.findFirst({
      where: { laboratoryId, OR: [{ barcode: code }, { qrcode: code }] },
    });
  }

  async update(id: string, dto: UpdateProductDto, laboratoryId: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product || product.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Product not found');
    }
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: string, laboratoryId: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product || product.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Product not found');
    }
    await this.prisma.product.delete({ where: { id } });
  }
}