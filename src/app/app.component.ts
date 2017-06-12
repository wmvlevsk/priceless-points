import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pulse Points Leaderboard!';

  subscription: Subscription;
  loggedIn: boolean;

  constructor(private authService: AuthService, public snackBar: MdSnackBar) {

    this.subscription = authService.loginAnnounced$.subscribe(
      obj => {
        this.loggedIn = true;
      });
    this.subscription = authService.logoutAnnounced$.subscribe(
      obj => {
        this.loggedIn = false;
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "close", {
      duration: 1500,
    });
  }

  logout() {
    this.authService.logout();
    this.openSnackBar("Logged out Successfully!")
  }

}
