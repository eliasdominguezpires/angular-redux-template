import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setItems } from '../components/modules/common/ingreso-egreso/ingreso-egreso.actions';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


import { ComunServicesService } from '../services/comun-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  itemsSubscription!: Subscription;

  constructor(
    private store: Store<AppState>,
    private comunService: ComunServicesService
  ) {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      ).subscribe(({ user }) => {
        if(user){
          console.log(user);
          this.itemsSubscription = this.comunService.ingresosEgresosListener(user?.uid)
            .subscribe(result => {
              //console.log(result);
              this.store.dispatch(setItems({
                items: result
              }))
            })
        }
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.itemsSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

}
