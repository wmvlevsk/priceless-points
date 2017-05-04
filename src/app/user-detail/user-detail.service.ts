import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserDetailService {
  constructor(private http: Http) { }
  // Get all posts from the API
  url = 'http://localhost:3000';
  
  getEmployeeInfo(id: Number) {
    return this.http.get(this.url + '/api/employee/'+ id)
      .map(res => res.json());
  }
}