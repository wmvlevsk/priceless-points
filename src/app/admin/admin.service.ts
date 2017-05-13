import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
  constructor(private http: Http) { }
  // Get all posts from the API
  url = 'http://localhost:3000';

  loadEmployees(payload) {
    return this.http.post(this.url + '/api/addEmployees', JSON.stringify(payload), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .map(res => res.json());
  }

  loadApplauds(payload) {
    return this.http.post(this.url + '/api/addApplauds', JSON.stringify(payload), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .map(res => res.json());
  }
}