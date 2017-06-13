import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MdSnackBar } from '@angular/material';
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  payload = {};
  constructor(private authService: AuthService, public router: Router, public snackBar: MdSnackBar) { }

  login() {
    if (this.payload['username'] != undefined && this.payload['password'] != undefined) {
      this.authService.login(this.payload).subscribe(obj => {
        if (obj['status'] == 'Error!') {
          this.openSnackBar("Incorrect Login");
        }
        else {
          this.authService.isLoggedIn = true;
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
          // Redirect the user
          this.router.navigate([redirect]);
          this.openSnackBar("Logged in Successfully!");
        }
      });
    }

  }
  logout() {
    this.authService.logout();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "close", {
      duration: 1500,
    });
  }
}
