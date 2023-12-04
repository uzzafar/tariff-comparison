import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriceComparisonComponent } from './price-comparison.component';
import { TariffService } from '../tariff.service';
import { of } from 'rxjs';

describe('PriceComparisonComponent', () => {
  let component: PriceComparisonComponent;
  let fixture: ComponentFixture<PriceComparisonComponent>;
  let tariffServiceSpy: jasmine.SpyObj<TariffService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TariffService', ['calculateTariffPrices']);

    TestBed.configureTestingModule({
      declarations: [PriceComparisonComponent],
      providers: [{ provide: TariffService, useValue: spy }],
    });

    fixture = TestBed.createComponent(PriceComparisonComponent);
    component = fixture.componentInstance;
    tariffServiceSpy = TestBed.inject(TariffService) as jasmine.SpyObj<TariffService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate prices when consumption is valid', () => {
    const mockPrices = [
      { name: 'Tariff A', annualCost: 500 },
      { name: 'Tariff B', annualCost: 600 },
    ];
    tariffServiceSpy.calculateTariffPrices.and.returnValue(of(mockPrices));
    component.consumption = 1000;

    component.calculatePrices();

    expect(tariffServiceSpy.calculateTariffPrices).toHaveBeenCalledWith(1000);
    expect(component.tariffPrices).toEqual(mockPrices);
    expect(component.isLoading).toBe(false);
    expect(component.isError).toBe(false);
  });

  it('should not calculate prices when consumption is negative', () => {
    component.consumption = -1000;

    component.calculatePrices();

    expect(tariffServiceSpy.calculateTariffPrices).not.toHaveBeenCalled();
    expect(component.tariffPrices).toEqual([]);
    expect(component.isLoading).toBe(false);
    expect(component.isError).toBe(false);
  });
});
