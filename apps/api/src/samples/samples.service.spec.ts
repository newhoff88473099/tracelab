import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SamplesService } from './samples.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SamplesService', () => {
  let service: SamplesService;

  const mockPrisma = {
    sample: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    client: {
      findUnique: jest.fn(),
    },
    product: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SamplesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<SamplesService>(SamplesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a sample with valid client', async () => {
      const dto = { code: 'SMP-001', clientId: 'client-1', productId: null };
      const laboratoryId = 'lab-1';

      mockPrisma.client.findUnique.mockResolvedValue({
        id: 'client-1',
        laboratoryId: 'lab-1',
      });
      mockPrisma.sample.create.mockResolvedValue({ id: 'sample-1', ...dto, laboratoryId });

      const result = await service.create(dto as any, laboratoryId);

      expect(mockPrisma.client.findUnique).toHaveBeenCalledWith({
        where: { id: 'client-1' },
      });
      expect(mockPrisma.sample.create).toHaveBeenCalledWith({
        data: { ...dto, laboratoryId },
      });
      expect(result.laboratoryId).toBe(laboratoryId);
    });

    it('should throw NotFoundException when client does not belong to laboratory', async () => {
      const dto = { code: 'SMP-001', clientId: 'client-1' };

      mockPrisma.client.findUnique.mockResolvedValue({
        id: 'client-1',
        laboratoryId: 'other-lab',
      });

      await expect(service.create(dto as any, 'lab-1')).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when client does not exist', async () => {
      const dto = { code: 'SMP-001', clientId: 'client-1' };

      mockPrisma.client.findUnique.mockResolvedValue(null);

      await expect(service.create(dto as any, 'lab-1')).rejects.toThrow(NotFoundException);
    });

    it('should validate product belongs to laboratory when provided', async () => {
      const dto = { code: 'SMP-001', clientId: 'client-1', productId: 'product-1' };

      mockPrisma.client.findUnique.mockResolvedValue({ id: 'client-1', laboratoryId: 'lab-1' });
      mockPrisma.product.findUnique.mockResolvedValue({ id: 'product-1', laboratoryId: 'other-lab' });

      await expect(service.create(dto as any, 'lab-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a sample and validate new client', async () => {
      const dto = { clientId: 'new-client' };
      const existingSample = { id: 'sample-1', laboratoryId: 'lab-1' };

      mockPrisma.sample.findUnique.mockResolvedValue(existingSample);
      mockPrisma.client.findUnique.mockResolvedValue({
        id: 'new-client',
        laboratoryId: 'lab-1',
      });
      mockPrisma.sample.update.mockResolvedValue({ id: 'sample-1', ...dto });

      await service.update('sample-1', dto, 'lab-1');

      expect(mockPrisma.client.findUnique).toHaveBeenCalledWith({
        where: { id: 'new-client' },
      });
    });

    it('should throw NotFoundException when updating with invalid product', async () => {
      const dto = { productId: 'invalid-product' };

      mockPrisma.sample.findUnique.mockResolvedValue({ id: 'sample-1', laboratoryId: 'lab-1' });
      mockPrisma.product.findUnique.mockResolvedValue({
        id: 'invalid-product',
        laboratoryId: 'other-lab',
      });

      await expect(service.update('sample-1', dto, 'lab-1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByCode', () => {
    it('should return null when sample not found', async () => {
      mockPrisma.sample.findFirst.mockResolvedValue(null);

      const result = await service.findByCode('UNKNOWN', 'lab-1');

      expect(result).toBeNull();
    });

    it('should return sample when found', async () => {
      const sample = { id: 'sample-1', code: 'SMP-001', laboratoryId: 'lab-1' };
      mockPrisma.sample.findFirst.mockResolvedValue(sample);

      const result = await service.findByCode('SMP-001', 'lab-1');

      expect(result).toEqual(sample);
    });
  });
});