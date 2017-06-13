import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }
  // Get all posts from the API
  url = 'http://localhost:3000';

  private loginAnnouncedSource = new Subject<string>();
  private logoutAnnouncedSource = new Subject<string>();

  loginAnnounced$ = this.loginAnnouncedSource.asObservable();

  logoutAnnounced$ = this.logoutAnnouncedSource.asObservable();

  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(payload): Observable<boolean> {
    this.loginAnnouncedSource.next("Admin User");
    return this.http.post(this.url + '/api/authenticate', JSON.stringify(payload), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).map(res => res.json());
  };


  logout(): void {
    this.logoutAnnouncedSource.next(null);
    this.isLoggedIn = false;
  }
}
