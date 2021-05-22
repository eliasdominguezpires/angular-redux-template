import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
})
export class RegistrerComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
  }

  ngOnInit(): void {


  }

  createUser() {
    if (this.registerForm.invalid) { return };

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      },
    })

    const { name, email, password } = this.registerForm.value;

    this.authService.createUser(name, email, password)
      .then(credenciales => {
        console.log(credenciales);
        Swal.close();
        this.router.navigate(['/']);
      }).catch(err => {
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
