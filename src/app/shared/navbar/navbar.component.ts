import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  userLogin: string;

  constructor(public authService: AuthService) {
    this.userLogin = 'elias';
  }

  ngOnInit(): void {
  }
}
