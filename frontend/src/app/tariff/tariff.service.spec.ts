import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TariffService } from './tariff.service';

describe('TariffService', () => {
  let service: TariffService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TariffService],
    });
    service = TestBed.inject(TariffService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get tariffs', () => {
    const mockTariffs = [{ id: 1, name: 'Tariff A' }, { id: 2, name: 'Tariff B' }];
    
    service.getTariffs().subscribe((tariffs) => {
      expect(tariffs).toEqual(mockTariffs);
    });
    
    const req = httpTestingController.expectOne('http://localhost:3000/tariffs');
    expect(req.request.method).toBe('GET');
    req.flush(mockTariffs);
  });

  it('should calculate tariff prices', () => {
    const consumption = 100;
    const mockResult = { price: 50.0 };
    
    service.calculateTariffPrices(consumption).subscribe((result) => {
      expect(result).toEqual(mockResult);
    });
    
    const req = httpTestingController.expectOne('http://localhost:3000/calculate-tariffs');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ consumption });
    req.flush(mockResult);
  });
});
