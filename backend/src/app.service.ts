import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private tariffs = [
    {"name": "Product A", "type": 1, "baseCost": 5, "additionalKwhCost": .22},
    {"name": "Product B", "type": 2, "includedKwh": 4000, "baseCost": 800, "additionalKwhCost": .30}
    // Add more tariff data here
  ];

  getTariffs() {
    return this.tariffs;
  }

  calculateTariffs(consumption: number) {
    if (typeof consumption !== 'number' || isNaN(consumption) || consumption < 0) {
      throw new Error('Invalid consumption value');
    }

    return this.tariffs.map(tariff => {
      if (tariff.type === 1) {
        const annualCost = tariff.baseCost * 12 + consumption * tariff.additionalKwhCost;
        return { name: tariff.name, annualCost };
      } else if (tariff.type === 2) {
        if (consumption <= tariff.includedKwh) {
          return { name: tariff.name, annualCost: tariff.baseCost };
        } else {
          const additionalConsumption = consumption - tariff.includedKwh;
          const annualCost = tariff.baseCost + additionalConsumption * tariff.additionalKwhCost;
          return { name: tariff.name, annualCost };
        }
      }
    });
  }
}
