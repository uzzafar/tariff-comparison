import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get tariffs from the service', () => {
    const mockTariffs = [{ name: 'Product A', type: 1, baseCost: 5, additionalKwhCost: 0.22 }];
    jest.spyOn(appService, 'getTariffs').mockReturnValue(mockTariffs);

    const result = controller.getTariffs();

    expect(result).toEqual(mockTariffs);
  });

  it('should calculate tariffs using the service', () => {
    const mockCalculationResult = [{ name: 'Product A', annualCost: 100 }];
    jest.spyOn(appService, 'calculateTariffs').mockReturnValue(mockCalculationResult);

    const consumption = 5000; // Adjust as needed
    const result = controller.calculateTariffs({ consumption });

    expect(result).toEqual(mockCalculationResult);
  });

  it('should handle error during tariff calculation', () => {
    jest.spyOn(appService, 'calculateTariffs').mockImplementation(() => {
      throw new Error('Invalid consumption value');
    });

    const invalidConsumption = -100; // Adjust as needed
    expect(() => controller.calculateTariffs({ consumption: invalidConsumption })).toThrowError('Invalid request data');
  });
});
