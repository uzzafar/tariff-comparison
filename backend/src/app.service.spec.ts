import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate tariffs correctly', () => {
    const consumption = 5000; // Adjust as needed

    const result = service.calculateTariffs(consumption);

    // Add your assertions here based on the expected results
    expect(result).toHaveLength(2); // Adjust as needed
    // Add more assertions based on your specific requirements
  });

  it('should throw an error for invalid consumption value', () => {
    const invalidConsumption = -100; // Adjust as needed

    expect(() => service.calculateTariffs(invalidConsumption)).toThrowError('Invalid consumption value');
  });
});
