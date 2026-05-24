import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ClientsService', () => {
  let service: ClientsService;

  const mockPrisma = {
    client: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a client', async () => {
      const dto = { name: 'Test Client', document: '123' };
      const laboratoryId = 'lab-1';

      mockPrisma.client.create.mockResolvedValue({ id: 'client-1', ...dto, laboratoryId });

      const result = await service.create(dto as any, laboratoryId);

      expect(mockPrisma.client.create).toHaveBeenCalledWith({
        data: { ...dto, laboratoryId },
      });
      expect(result.laboratoryId).toBe(laboratoryId);
    });
  });

  describe('findAll', () => {
    it('should return all clients for laboratory', async () => {
      const clients = [{ id: 'client-1', name: 'Client 1' }];
      mockPrisma.client.findMany.mockResolvedValue(clients);

      const result = await service.findAll('lab-1');

      expect(mockPrisma.client.findMany).toHaveBeenCalledWith({
        where: { laboratoryId: 'lab-1' },
        select: expect.any(Object),
      });
      expect(result).toEqual(clients);
    });
  });

  describe('findOne', () => {
    it('should return client when found', async () => {
      const client = { id: 'client-1', laboratoryId: 'lab-1', name: 'Test' };
      mockPrisma.client.findUnique.mockResolvedValue(client);

      const result = await service.findOne('client-1', 'lab-1');

      expect(result).toEqual(client);
    });

    it('should throw NotFoundException when client not found', async () => {
      mockPrisma.client.findUnique.mockResolvedValue(null);

      await expect(service.findOne('client-1', 'lab-1')).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when client belongs to different laboratory', async () => {
      mockPrisma.client.findUnique.mockResolvedValue({ id: 'client-1', laboratoryId: 'other-lab' });

      await expect(service.findOne('client-1', 'lab-1')).rejects.toThrow(NotFoundException);
    });
  });
});