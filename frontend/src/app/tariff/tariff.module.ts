import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TariffRoutingModule } from './tariff-routing.module';
import { TariffListComponent } from './tariff-list/tariff-list.component';
import { PriceComparisonComponent } from './price-comparison/price-comparison.component';

@NgModule({
  declarations: [
    TariffListComponent,
    PriceComparisonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TariffRoutingModule
  ],
})
export class TariffModule {}
