import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutesModule } from 'src/app/dashboard/dashboard-routes.module';

import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { OrdenIngresoPipe } from 'src/app/pipes/orden-ingreso.pipe';



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class CommonsModule { }
