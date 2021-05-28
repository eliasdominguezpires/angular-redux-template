import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos', 'Diferencia'];
  public doughnutChartData: MultiDataSet = [[0, 0]];

  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('ingresosEgresos')
      .subscribe(({ items }) => this.generatEstatistics(items))
  }

  ngOnInit(): void {
  }

  generatEstatistics(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.totalIngresos = 0;
    this.egresos = 0;
    this.totalEgresos = 0;

    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngresos += item.monto;
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos++;
      }

    }

    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos, this.totalIngresos - this.totalEgresos]];
  }

}
