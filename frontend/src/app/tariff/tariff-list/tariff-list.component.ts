import { Component, inject, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TariffService } from '../tariff.service';

@Component({
  selector: 'app-tariff-list',
  templateUrl: './tariff-list.component.html',
  styleUrls: ['./tariff-list.component.css']
})
export class TariffListComponent implements OnInit {
  tariffs: any[] = [];
  isLoading: boolean = false;
  isError: boolean = false;

  private readonly destroy: DestroyRef = inject(DestroyRef);
  tariffService: TariffService = inject(TariffService);

  ngOnInit() {
    this.tariffService.getTariffs().pipe(takeUntilDestroyed(this.destroy)).subscribe({  
      next: (data) => this.tariffs = data,  
      error: (err) => {
        this.isError = true;
        console.error(err)
      },  
      complete: () => this.isLoading = false  
    });
  }

  getTariffType(type: number): string {
    switch (type) {
      case 1:
        return 'Basic Electricity Tariff';
      case 2:
        return 'Packaged Tariff';
      // Add more cases for other tariff types if needed
      default:
        return 'Unknown Type';
    }
  }
}
