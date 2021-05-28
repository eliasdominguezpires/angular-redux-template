import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  userLogin: string = '';
  userLoginSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
  ) {
    this.userLoginSubscription = this.store.select('user').pipe(
      filter(({ user }) => user != null)
    )
      .subscribe(({ user }) => {
        if (user)
          this.userLogin = user?.email;
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userLoginSubscription.unsubscribe();
  }
}
