import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(1),
        Validators.min(1),
        Validators.maxLength(100)]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.min(6),
      ]
      ],
    })
  }

  ngOnInit(): void {

  }

  login() {
    if (this.loginForm.invalid) { return };

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      },
    })

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .then(result => {
        console.log(result);
        Swal.close();
        this.router.navigate(['/dashborad']);
      }).catch(err => {
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
