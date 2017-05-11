import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {
  constructor(private http: Http) { }
  // Get all posts from the API
  url = 'http://localhost:3000';

  loadEmployees(body) {
    let payload = {};
    payload['records'] = body;

    return this.http.post(this.url + '/api/addEmployees', JSON.stringify(payload), {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .map(res => res.json()).subscribe();
  }
}