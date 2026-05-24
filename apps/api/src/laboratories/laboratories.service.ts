import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';

@Injectable()
export class LaboratoriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLaboratoryDto) {
    const existing = await this.prisma.laboratory.findUnique({
      where: { cnpj: dto.cnpj },
    });
    if (existing) {
      throw new ConflictException('CNPJ already registered');
    }
    return this.prisma.laboratory.create({ data: dto });
  }

  async findAll() {
    return this.prisma.laboratory.findMany({
      select: {
        id: true,
        name: true,
        cnpj: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const laboratory = await this.prisma.laboratory.findUnique({
      where: { id },
    });
    if (!laboratory) {
      throw new NotFoundException('Laboratory not found');
    }
    return laboratory;
  }

  async update(id: string, dto: UpdateLaboratoryDto) {
    const laboratory = await this.prisma.laboratory.findUnique({ where: { id } });
    if (!laboratory) {
      throw new NotFoundException('Laboratory not found');
    }
    return this.prisma.laboratory.update({ where: { id }, data: dto });
  }
}