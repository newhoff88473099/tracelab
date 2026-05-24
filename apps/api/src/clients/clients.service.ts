import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClientDto, laboratoryId: string) {
    return this.prisma.client.create({
      data: { ...dto, laboratoryId },
    });
  }

  async findAll(laboratoryId: string) {
    return this.prisma.client.findMany({
      where: { laboratoryId },
      select: {
        id: true,
        name: true,
        document: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string, laboratoryId: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!client || client.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Client not found');
    }
    return client;
  }

  async update(id: string, dto: UpdateClientDto, laboratoryId: string) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client || client.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Client not found');
    }
    return this.prisma.client.update({ where: { id }, data: dto });
  }

  async remove(id: string, laboratoryId: string) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client || client.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Client not found');
    }
    await this.prisma.client.delete({ where: { id } });
  }
}