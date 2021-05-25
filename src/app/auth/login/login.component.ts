import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from 'src/app/shared/ui.actions';

import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {

    this.loginForm = this.fb.group({
      email: ['elias@elias.com', [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.min(1),
        Validators.maxLength(100)]
      ],
      password: ['123456', [
        Validators.required,
        Validators.minLength(6),
        Validators.min(6),
      ]
      ],
    });

    this.uiSubscription = this.store.select('ui')
      .subscribe(ui => {
        //console.log('cargando subs');
        this.loading = ui.isLoading
      });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) { return };

    this.store.dispatch(uiActions.isLoading())

    /*Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      },
    })*/

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .then(result => {
        //console.log(result);
        //Swal.close();
        this.store.dispatch(uiActions.stopLoading())
        this.router.navigate(['/dashborad']);
      }).catch(err => {
        this.store.dispatch(uiActions.stopLoading());
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          footer: '<a href>Why do I have this issue?</a>'
        })

      })
  }

  getValidEmail() {
    return this.loginForm.get('email')?.valid;
  }
  getValidPassword() {
    return this.loginForm.get('password')?.valid;
  }
}
