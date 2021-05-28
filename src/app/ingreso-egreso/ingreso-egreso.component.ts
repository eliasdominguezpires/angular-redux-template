import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { ComunServicesService } from '../services/comun-services.service';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;
  loadingSubscription: Subscription

  constructor(
    private fb: FormBuilder,
    private comunService: ComunServicesService,
    private store: Store<AppState>
  ) {

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]],
    });

    this.loadingSubscription = this.store.select('ui')
      .subscribe((ui) => this.loading = ui.isLoading);
  }

  ngOnInit(): void {
    /*this.store.select('ui')
      .subscribe(({ isLoading }) => this.loading = isLoading);*/
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  guardar() {


    if (this.ingresoForm.invalid)
      return;
    this.store.dispatch(isLoading());

    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo, '');

    this.comunService.postFirestore(ingresoEgreso)
      .then((resul) => {
        Swal.fire('Registro Creado!', descripcion, 'success');
        this.ingresoForm.reset();
        this.store.dispatch(stopLoading());
        //console.log('exito', resul);
      }).catch(err => {
        //console.log(err);
        this.store.dispatch(stopLoading());
        Swal.fire('Error!', err.message, 'error');
      });
  }
}
