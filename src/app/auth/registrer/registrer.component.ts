import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
})
export class RegistrerComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  loading: boolean = false;
  uiSubsription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.min(1),
        Validators.maxLength(100)]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.min(6),
        ],
      ],
    });

    this.uiSubsription = this.store.select('ui')
      .subscribe(ui => this.loading = ui.isLoading)
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.uiSubsription.unsubscribe();
  }

  createUser() {
    if (this.registerForm.invalid) { return };

    this.store.dispatch(isLoading());

    /*Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      },
    })*/

    const { name, email, password } = this.registerForm.value;

    this.authService.createUser(name, email, password)
      .then(credenciales => {
        console.log(credenciales);
        //Swal.close();
        this.store.dispatch(stopLoading());

        this.router.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          footer: '<a href>Why do I have this issue?</a>'
        })

      })
  }

  getValidName() {
    return this.registerForm.get('name')?.valid;
  }
  getValidEmail() {
    return this.registerForm.get('email')?.valid;
  }
  getValidPassword() {
    return this.registerForm.get('password')?.valid;
  }
}
