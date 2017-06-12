import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {

  constructor() { }

  private loginAnnouncedSource = new Subject<string>();
  private logoutAnnouncedSource = new Subject<string>();

  loginAnnounced$ = this.loginAnnouncedSource.asObservable();

  logoutAnnounced$ = this.logoutAnnouncedSource.asObservable();

  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    this.loginAnnouncedSource.next("Admin User");
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.logoutAnnouncedSource.next(null);
    this.isLoggedIn = false;
  }
}
