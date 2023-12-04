import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TariffListComponent } from './tariff-list.component';
import { TariffService } from '../tariff.service';
import { of } from 'rxjs';

describe('TariffListComponent', () => {
  let component: TariffListComponent;
  let fixture: ComponentFixture<TariffListComponent>;
  let tariffServiceSpy: jasmine.SpyObj<TariffService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('TariffService', ['getTariffs']);

    TestBed.configureTestingModule({
      declarations: [TariffListComponent],
      providers: [{ provide: TariffService, useValue: spy }],
    });

    fixture = TestBed.createComponent(TariffListComponent);
    component = fixture.componentInstance;
    tariffServiceSpy = TestBed.inject(TariffService) as jasmine.SpyObj<TariffService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch tariffs on ngOnInit', () => {
    const mockTariffs = [{ id: 1, name: 'Tariff A' }, { id: 2, name: 'Tariff B' }];
    tariffServiceSpy.getTariffs.and.returnValue(of(mockTariffs));

    component.ngOnInit();

    expect(tariffServiceSpy.getTariffs).toHaveBeenCalled();
    expect(component.tariffs).toEqual(mockTariffs);
    expect(component.isLoading).toBe(false);
    expect(component.isError).toBe(false);
  });

  it('should return tariff type for a given number', () => {
    expect(component.getTariffType(1)).toBe('Basic Electricity Tariff');
    expect(component.getTariffType(2)).toBe('Packaged Tariff');
    expect(component.getTariffType(3)).toBe('Unknown Type');
  });
});
