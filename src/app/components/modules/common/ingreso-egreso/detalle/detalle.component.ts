import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
//import { AppState } from 'src/app/app.reducer';
import { AppStateWithModule } from '../ingreso-egreso.reducer';

import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { ComunServicesService } from 'src/app/services/comun-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  itemsSubscription: Subscription
  constructor(
    private store: Store<AppStateWithModule>, //Store<AppState>
    private comunService: ComunServicesService
  ) {
    this.itemsSubscription = this.store.select('ingresosEgresos')
      .subscribe(({ items }) => {
        if (items.length > 0) {
          console.log(items);
          this.ingresosEgresos = items;
        }
      })
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.itemsSubscription.unsubscribe();
  }

  borrar(uid: any) {
    try {
      this.comunService.deleteFirestore(uid, '/ingresos-egresos/items/')
        .then(result => {
          Swal.fire('Borrado!', 'You are the rockstar!', 'success');
        }).catch(err => {
          Swal.fire('Error!', err.message, 'error');
        })
    } catch (error) {
      Swal.fire('Error!', error.message, 'error');
    }
  }
}
