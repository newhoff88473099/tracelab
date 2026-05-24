import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockPrisma = {
    product: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto = { name: 'Test Product', sku: 'SKU-001' };
      const laboratoryId = 'lab-1';

      mockPrisma.product.create.mockResolvedValue({ id: 'product-1', ...dto, laboratoryId });

      const result = await service.create(dto as any, laboratoryId);

      expect(mockPrisma.product.create).toHaveBeenCalledWith({
        data: { ...dto, laboratoryId },
      });
      expect(result.laboratoryId).toBe(laboratoryId);
    });
  });

  describe('findByCode', () => {
    it('should return null when product not found', async () => {
      mockPrisma.product.findFirst.mockResolvedValue(null);

      const result = await service.findByCode('UNKNOWN', 'lab-1');

      expect(result).toBeNull();
    });

    it('should find product by barcode', async () => {
      const product = { id: 'product-1', barcode: 'BARCODE-001' };
      mockPrisma.product.findFirst.mockResolvedValue(product);

      const result = await service.findByCode('BARCODE-001', 'lab-1');

      expect(mockPrisma.product.findFirst).toHaveBeenCalledWith({
        where: { laboratoryId: 'lab-1', OR: [{ barcode: 'BARCODE-001' }, { qrcode: 'BARCODE-001' }] },
      });
      expect(result).toEqual(product);
    });
  });
});