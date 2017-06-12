import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MdSnackBar } from '@angular/material';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string;
  constructor(private authService: AuthService, public router: Router, public snackBar: MdSnackBar) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login() {
    this.message = 'Trying to log in ...';
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
        // Redirect the user
        this.router.navigate([redirect]);
      }
      this.openSnackBar("Logged in Successfully!")
      
    });
  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "close", {
      duration: 1500,
    });
  }
}
