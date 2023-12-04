import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TariffListComponent } from './tariff-list/tariff-list.component';
import { PriceComparisonComponent } from './price-comparison/price-comparison.component';

const routes: Routes = [
  { path: '', redirectTo: 'price-comparison', pathMatch: 'full' },
  { path: 'tariff-list', component: TariffListComponent },
  { path: 'price-comparison', component: PriceComparisonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TariffRoutingModule {}
