import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(laboratoryId: string) {
    return this.prisma.user.findMany({
      where: { laboratoryId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string, laboratoryId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user || user.laboratoryId !== laboratoryId) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, dto: UpdateUserDto, laboratoryId: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user || user.laboratoryId !== laboratoryId) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: dto,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });
    return updated;
  }

  async remove(id: string, laboratoryId: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user || user.laboratoryId !== laboratoryId) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({ where: { id } });
  }
}