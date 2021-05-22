import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router : Router
    ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
      .then( () => {
        this.router.navigate(['/login'])
      }).catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          footer: '<a href>Why do I have this issue?</a>'
        })

      });
  }
}
