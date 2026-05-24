import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { SampleStatus } from '@prisma/client';

@Injectable()
export class SamplesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSampleDto, laboratoryId: string) {
    const client = await this.prisma.client.findUnique({
      where: { id: dto.clientId },
    });
    if (!client || client.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Client not found');
    }

    if (dto.productId) {
      const product = await this.prisma.product.findUnique({
        where: { id: dto.productId },
      });
      if (!product || product.laboratoryId !== laboratoryId) {
        throw new NotFoundException('Product not found');
      }
    }

    return this.prisma.sample.create({
      data: { ...dto, laboratoryId },
    });
  }

  async findAll(laboratoryId: string) {
    return this.prisma.sample.findMany({
      where: { laboratoryId },
      include: {
        client: { select: { id: true, name: true } },
        product: { select: { id: true, name: true } },
      },
    });
  }

  async findOne(id: string, laboratoryId: string) {
    const sample = await this.prisma.sample.findUnique({
      where: { id },
      include: {
        client: true,
        product: true,
        analyses: true,
      },
    });
    if (!sample || sample.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Sample not found');
    }
    return sample;
  }

  async findByCode(code: string, laboratoryId: string): Promise<{ id: string; code: string; laboratoryId: string } | null> {
    return this.prisma.sample.findFirst({
      where: { code, laboratoryId },
    });
  }

  async update(id: string, dto: UpdateSampleDto, laboratoryId: string) {
    const sample = await this.prisma.sample.findUnique({ where: { id } });
    if (!sample || sample.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Sample not found');
    }

    if (dto.clientId) {
      const client = await this.prisma.client.findUnique({ where: { id: dto.clientId } });
      if (!client || client.laboratoryId !== laboratoryId) {
        throw new NotFoundException('Client not found');
      }
    }

    if (dto.productId) {
      const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
      if (!product || product.laboratoryId !== laboratoryId) {
        throw new NotFoundException('Product not found');
      }
    }

    return this.prisma.sample.update({ where: { id }, data: dto });
  }

  async updateStatus(id: string, status: SampleStatus, laboratoryId: string) {
    const sample = await this.prisma.sample.findUnique({ where: { id } });
    if (!sample || sample.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Sample not found');
    }
    return this.prisma.sample.update({ where: { id }, data: { status } });
  }

  async remove(id: string, laboratoryId: string) {
    const sample = await this.prisma.sample.findUnique({ where: { id } });
    if (!sample || sample.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Sample not found');
    }
    await this.prisma.sample.delete({ where: { id } });
  }
}