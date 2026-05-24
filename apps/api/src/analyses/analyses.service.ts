import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { AnalysisStatus } from '@prisma/client';

@Injectable()
export class AnalysesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAnalysisDto, laboratoryId: string, analystId: string) {
    const sample = await this.prisma.sample.findUnique({ where: { id: dto.sampleId } });
    if (!sample || sample.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Sample not found');
    }
    return this.prisma.analysis.create({
      data: { ...dto, analystId, startedAt: new Date() },
    });
  }

  async findAll(laboratoryId: string) {
    return this.prisma.analysis.findMany({
      where: { sample: { laboratoryId } },
      include: { sample: { select: { code: true } } },
    });
  }

  async findOne(id: string, laboratoryId: string) {
    const analysis = await this.prisma.analysis.findUnique({
      where: { id },
      include: { sample: true },
    });
    if (!analysis || !analysis.sample || analysis.sample.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Analysis not found');
    }
    return analysis;
  }

  async update(id: string, dto: UpdateAnalysisDto, laboratoryId: string) {
    const analysis = await this.prisma.analysis.findUnique({
      where: { id },
      include: { sample: true },
    });
    if (!analysis || !analysis.sample || analysis.sample.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Analysis not found');
    }
    return this.prisma.analysis.update({ where: { id }, data: dto });
  }

  async validate(id: string, laboratoryId: string) {
    const analysis = await this.prisma.analysis.findUnique({
      where: { id },
      include: { sample: true },
    });
    if (!analysis || !analysis.sample || analysis.sample.laboratoryId !== laboratoryId) {
      throw new NotFoundException('Analysis not found');
    }
    return this.prisma.analysis.update({
      where: { id },
      data: { status: AnalysisStatus.validated, completedAt: new Date() },
    });
  }
}