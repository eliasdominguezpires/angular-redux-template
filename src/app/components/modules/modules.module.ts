import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CommonsModule } from './common/commons.module';
import { ingresoEgresoReducer } from './common/ingreso-egreso/ingreso-egreso.reducer';



@NgModule({
  declarations: [],
  imports: [
    CommonsModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer)
  ],
  exports:[

  ]
})
export class ModulesModule { }
