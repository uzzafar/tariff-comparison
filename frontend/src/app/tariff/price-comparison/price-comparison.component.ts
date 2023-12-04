import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TariffService } from '../tariff.service';

@Component({
  selector: 'app-price-comparison',
  templateUrl: './price-comparison.component.html',
  styleUrls: ['./price-comparison.component.css']
})
export class PriceComparisonComponent {
  private readonly destroy: DestroyRef = inject(DestroyRef);

  tariffService: TariffService = inject(TariffService);
  consumption: number = 0;
  tariffPrices: { name: string, annualCost: number }[] = [];
  isLoading: boolean = false;
  isError: boolean = false;

  calculatePrices() {
    if (this.consumption >= 0) {
      this.isLoading = true;
      this.isError = false;
      this.tariffService.calculateTariffPrices(this.consumption).pipe(takeUntilDestroyed(this.destroy)).subscribe({  
        next: (x) => this.tariffPrices = x,  
        error: (err) => {
          this.isError = true;
          console.error(err)
        },  
        complete: () => this.isLoading = false  
      });
    }
  }
}